<?php
/**
 * Lycos Core CMS API
 * Server-side article/insight persistence for the admin editorial pipeline.
 * Data is stored in cms-data.json on disk — readable by any browser, any tab.
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$dataFile = __DIR__ . '/cms-data.json';

// ── Helpers ──────────────────────────────────────────────────────────────────

function readCmsData(string $path): array {
    if (!file_exists($path)) {
        return ['articles' => [], 'insights' => [], 'deletedIds' => [], 'updatedAt' => date('c')];
    }
    $raw = file_get_contents($path);
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : ['articles' => [], 'insights' => [], 'deletedIds' => [], 'updatedAt' => date('c')];
}

function writeCmsData(string $path, array $data): bool {
    $data['updatedAt'] = date('c');
    return file_put_contents($path, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)) !== false;
}

// ── Router ────────────────────────────────────────────────────────────────────

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Return full CMS dataset — articles + insights, deleted IDs filtered out
    $data = readCmsData($dataFile);
    $deletedIds = array_flip($data['deletedIds'] ?? []);

    $filtered = $data;
    $filtered['articles'] = array_values(array_filter($data['articles'] ?? [], fn($a) => !isset($deletedIds[$a['id'] ?? ''])));
    $filtered['insights'] = array_values(array_filter($data['insights'] ?? [], fn($i) => !isset($deletedIds[$i['id'] ?? ''])));

    echo json_encode($filtered);
    exit;
}

if ($method === 'POST') {
    $raw = file_get_contents('php://input');
    $body = json_decode($raw, true);
    if (!is_array($body)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Invalid JSON body']);
        exit;
    }

    $action = $body['action'] ?? '';
    $data   = readCmsData($dataFile);

    switch ($action) {

        case 'publish_article':
            $article = $body['article'] ?? null;
            if (!$article || empty($article['id'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Missing article or article.id']);
                exit;
            }
            // Remove from deletedIds if republishing
            $data['deletedIds'] = array_values(array_filter($data['deletedIds'] ?? [], fn($id) => $id !== $article['id']));
            // Upsert: remove old copy then prepend
            $data['articles'] = array_values(array_filter($data['articles'] ?? [], fn($a) => ($a['id'] ?? '') !== $article['id']));
            array_unshift($data['articles'], $article);
            break;

        case 'publish_insight':
            $insight = $body['insight'] ?? null;
            if (!$insight || empty($insight['id'])) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Missing insight or insight.id']);
                exit;
            }
            $data['deletedIds'] = array_values(array_filter($data['deletedIds'] ?? [], fn($id) => $id !== $insight['id']));
            $data['insights'] = array_values(array_filter($data['insights'] ?? [], fn($i) => ($i['id'] ?? '') !== $insight['id']));
            array_unshift($data['insights'], $insight);
            break;

        case 'delete':
            $id = $body['id'] ?? '';
            if (empty($id)) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Missing id']);
                exit;
            }
            $data['articles'] = array_values(array_filter($data['articles'] ?? [], fn($a) => ($a['id'] ?? '') !== $id));
            $data['insights'] = array_values(array_filter($data['insights'] ?? [], fn($i) => ($i['id'] ?? '') !== $id));
            if (!in_array($id, $data['deletedIds'] ?? [])) {
                $data['deletedIds'][] = $id;
            }
            break;

        default:
            http_response_code(400);
            echo json_encode(['success' => false, 'error' => "Unknown action: {$action}"]);
            exit;
    }

    $ok = writeCmsData($dataFile, $data);
    echo json_encode(['success' => $ok, 'updatedAt' => $data['updatedAt'] ?? date('c')]);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'error' => 'Method not allowed']);
