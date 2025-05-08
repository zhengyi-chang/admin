import { request } from 'umi';
import type { NoticeType, ActivitiesType, AnalysisData, TodoType } from './data';

export async function queryProjectNotice(): Promise<{ data: NoticeType[] }> {
  return request('/api/v1/notice');
}

export async function queryTodo(): Promise<{ data: { list: TodoType[] } }> {
  return request('/api/v1/todo/list?pageSize=6&pageIndex=1&status=active');
}

export async function queryActivities(): Promise<{ data: ActivitiesType[] }> {
  return request('/api/v1/activities');
}

export async function fakeChartData(): Promise<{ data: AnalysisData }> {
  return request('/api/v1/fake_workplace_chart_data');
}
