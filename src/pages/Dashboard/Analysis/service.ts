import { request } from 'umi';
import type { AnalysisData } from './data';

export async function fakeChartData(options?: {
  [key: string]: any;
}): Promise<{ data: AnalysisData }> {
  return request('/api/v1/fake_analysis_chart_data', {
    params: { ...(options || {}) },
  });
}
