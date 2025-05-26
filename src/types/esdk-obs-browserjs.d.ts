declare module 'esdk-obs-browserjs' {
  export default class ObsClient {
    constructor(config: {
      access_key_id: string;
      secret_access_key: string;
      server: string;
      security_token?: string;
    });

    putObject(
      params: {
        Bucket: string;
        Key: string;
        SourceFile: File;
        ProgressCallback?: (transferredAmount: number, totalAmount: number) => void;
      },
      callback: (err: any, result: any) => void,
    ): void;
  }
}
