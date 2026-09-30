import SftpClient from "ssh2-sftp-client";

const sftp = new SftpClient();

const OVH_BASE_PATH = "www/uploads";

export const uploadToOvh = async (buffer, filename, folder) => {
  const remoteDir = `${OVH_BASE_PATH}/${folder}`;
  const remotePath = `${remoteDir}/${filename}`;

  try {
    await sftp.connect({
      host: process.env.OVH_SFTP_HOST,
      port: Number(process.env.OVH_SFTP_PORT),
      username: process.env.OVH_SFTP_USER,
      password: process.env.OVH_SFTP_PASSWORD,
    });

    const exists = await sftp.exists(remoteDir);

    if (!exists) {
      await sftp.mkdir(remoteDir, true);
    }

    await sftp.put(buffer, remotePath);

    return remotePath;
  } finally {
    await sftp.end();
  }
};

export const deleteFromOvh = async (fileUrl) => {
  const sftp = new SftpClient();

  try {

    const cleanPath = fileUrl.replace(/^\/+/, "");
    const remotePath = `www/${cleanPath}`;

    await sftp.connect({
      host: process.env.OVH_SFTP_HOST,
      port: Number(process.env.OVH_SFTP_PORT),
      username: process.env.OVH_SFTP_USER,
      password: process.env.OVH_SFTP_PASSWORD,
    });

    const exists = await sftp.exists(remotePath);

    if (exists) {
      await sftp.delete(remotePath);
    }
  } finally {
    await sftp.end();
  }
};