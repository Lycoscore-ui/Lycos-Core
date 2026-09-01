import * as ftp from 'basic-ftp';
import path from 'path';

async function deploy() {
  const host = process.env.FTP_SERVER || 'ftp.lycoscore.com';
  const user = process.env.FTP_USER || process.env.AFRIHOST_USERNAME;
  const password = process.env.FTP_PASSWORD || process.env.AFRIHOST_PASSWORD;
  const port = parseInt(process.env.FTP_PORT || '21', 10);
  const targetDir = process.env.FTP_DIR || './';

  if (!host || !user || !password) {
    console.error('ERROR: Missing FTP credentials in environment variables (FTP_SERVER, FTP_USER, FTP_PASSWORD)');
    process.exit(1);
  }

  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    console.log(`Connecting to ${host}:${port} as ${user}...`);
    await client.access({
      host,
      user,
      password,
      port,
      secure: false
    });

    console.log(`Successfully authenticated to FTP server!`);
    console.log(`Target directory: ${targetDir}`);

    if (targetDir && targetDir !== './' && targetDir !== '/') {
      await client.ensureDir(targetDir);
    }

    const distPath = path.resolve('dist');
    console.log(`Uploading contents of ${distPath} to ${targetDir}...`);
    
    // Remove Afrihost default parking index.php if present so index.html takes precedence
    try {
      await client.remove('index.php');
      console.log('✓ Cleaned up old default index.php parking page from root');
    } catch (e) {
      // Ignored if file doesn't exist
    }

    // Upload dist directory directly to target directory
    await client.uploadFromDir(distPath, targetDir);

    console.log('----------------------------------------------------');
    console.log('✓ All build assets and index.html uploaded successfully!');
    console.log('----------------------------------------------------');
  } catch (err) {
    console.error('FTP Deployment failed with error:', err);
    process.exit(1);
  } finally {
    client.close();
  }
}

deploy();