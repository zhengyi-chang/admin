export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export type BasicListItemDataType = {
  id: number;
  owner: string;
  title: string;
  avatar: string;
  cover: string;
  priority: 'l' | 'm' | 'h' | 'jj';
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  endAt: Date;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
};
