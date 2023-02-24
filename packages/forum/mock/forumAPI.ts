const articles = [
  { articleID: 0, state: 0, context: 'U', userID: 0, pubtime: '2023-2-19', title: 'art1', read: 0, collect: 0, light: 0 },
  { articleID: 1, state: 0, context: 'U', userID: 0, pubtime: '2023-2-20', title: 'art2', read: 0, collect: 0, light: 0 },
];

const pubcarticles = [
  { articleID: 3, state: 4, context: 'Uadwdsad', userID: 3, pubtime: '2023-2-19', title: 'art3', read: 4122, collect: 20, light: 372 },
  { articleID: 7, state: 4, context: 'Uctsvtrvrsvdvt', userID: 8, pubtime: '2023-2-20', title: 'art7', read: 2846, collect: 1123, light: 1916  },
  { articleID: 12, state: 4, context: 'Uadwdsadxcfresc', userID: 3, pubtime: '2023-2-19', title: 'deaev', read: 452, collect: 20, light: 341 },
  { articleID: 19, state: 4, context: 'Uctsvtrvrfcrecfescsesvdvt', userID: 8, pubtime: '2023-2-20', title: 'wf3ce', read: 2535, collect: 2415, light: 1916  },
]

export default {
  'GET /api/forum/queryArticleList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: articles },
      errorCode: 0,
    });
  },

  'GET /api/forum/querypubArticleList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: pubcarticles },
      errorCode: 0,
    });
  },

  'GET /api/users': [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' }
  ],
};
