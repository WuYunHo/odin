import mockjs from 'mockjs'

const users = [
  { id: 0, name: 'Umi', nickName: 'U', gender: 'MALE' },
  { id: 1, name: 'Fish', nickName: 'B', gender: 'FEMALE' },
];

export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'PUT /api/v1/user/': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
  'POST /api/user/loadUserByAccount': mockjs.mock({
    user: {
      name: '@name',
      avatar: '@color',
      type: '@natural',
      token: '@guid',
      'id|+1': 0,
    }
  })
};
