declare module 'ali-oss' {
  export default class OSS {
    constructor(options: {
      region: string;
      bucket: string;
      accessKeyId?: string;
      accessKeySecret?: string;
      stsToken?: string;
    });

    put(
      objectName: string,
      file: File,
      options?: {
        progress?: (p: number, checkpoint: any, res: any) => void;
        partSize?: number;
      },
    ): Promise<{
      url: string;
      [key: string]: any;
    }>;
  }
}
