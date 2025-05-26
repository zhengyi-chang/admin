/**
 * API配置文件
 * 根据不同的环境变量配置不同的API地址
 */

// 不同环境的API地址配置
const API_CONFIG: any = {
  test: 'https://admin-ecs-service.polyflow.tech', // 测试环境
  stage: 'https://stage.tech', // 预发布环境
  prod: 'https://prod.tech', // 生产环境
};

/**
 * 获取当前环境的API地址
 * @returns {string} API基础URL
 */
export const getApiBaseUrl = (): string => {
  // 从环境变量中获取当前环境
  const apiEnv = process.env.API_ENV || 'prod';

  // 返回对应环境的API地址
  return API_CONFIG[apiEnv];
};

export default API_CONFIG;
