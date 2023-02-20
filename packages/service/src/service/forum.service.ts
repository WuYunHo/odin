import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { Article, Comment } from '../entity/forum';

interface commentList {
  [propName: string]: any
}

@Provide()
export class ForumService {
  @InjectEntityModel(Article)
  articleModel: Repository<Article>;

  @InjectEntityModel(Comment)
  commentModel: Repository<Comment>;

  // find all ariticles
  async findAriticles() {
    let allArticle = await this.articleModel.find({});
    console.log("All photos from the db: ", allArticle);
  }

  // find user draft
  async findDraft(userID: number) {
    let draft = await this.articleModel.find({
      where: {
        userID: userID,
        state: 0,
      }
    })
    console.log('there are draft: ', draft)
    return draft
  } 

  // add articles
  async saveArticle(context: string, userID: number, title: string, state: number) {
    let article = new Article();
    article.state = state;
    article.title = title;
    article.userID = userID;
    article.context = context;

    // save entity
    const articleResult = await this.articleModel.save(article);

    // save success
    console.log('article id = ', articleResult.articleID);
  }

  async pubArticle(articleID: number) {
    let stateUpdate = await this.articleModel.findOne({
      where: {
        articleID: articleID,
      },
    });
    stateUpdate.state = 1;

    await this.articleModel.save(stateUpdate);

    console.log('article state =', stateUpdate.articleID);
  }

  async refuseArticle(articleID: number) {
    let stateUpdate = await this.articleModel.findOne({
      where: {
        articleID: articleID,
      },
    });
    stateUpdate.state = 0;

    await this.articleModel.save(stateUpdate);

    console.log('article state =', stateUpdate.articleID);
  }

  async deleteArticle(articleID: number) {
    const photo = await this.articleModel.findOne({
      where: {
        articleID: articleID,
      },
    });

    // 删除单个
    await this.articleModel.remove(photo);
  }

  // 一级comment
  async addFirstComment(articleID: number, context: string, userID: number) {
    let comment = new Comment();
    comment.articleID = articleID;
    comment.context = context;
    comment.userID = userID;
    comment.tarcomID = null;

    // save entity
    const commentResult = await this.commentModel.save(comment);

    // save success
    console.log('comment id = ', commentResult.comID);
  }

  //二级/三级comment
  async addOtherComment(articleID: number, context: string, userID: number, tarcomID: number) {
    let comment = new Comment();
    comment.articleID = null;
    comment.context = context;
    comment.userID = userID;
    comment.tarcomID = tarcomID;

    // save entity
    const commentResult = await this.commentModel.save(comment);

    // save success
    console.log('comment id = ', commentResult.comID);
  }

  // find all comments
  async findComments(articleID: number) {

    let comments : commentList;
    comments.firstcom = await this.commentModel.find({
      where: {
        articleID: articleID,
      }
    });

    //循环一级评论
    for (const key in comments.firstcom) {
      comments.firstcom[key].secondcom = await this.commentModel.find({
        where: {
          tarcomID: Equal(comments.firstcom[key].comID)
        }
      })

      //循环二级评论
      for (const seckey in comments.firstcom[key].secondcom) {
        let thirdcom = [];
        const getThirdCom = async (id: number) => {
          const result = this.commentModel.find({
            where: {
              tarcomID: Equal(comments.firstcom[key].secondcom[seckey].comID)
            }
          })
          if(!result) return;
          for(const item of await result) {
            thirdcom.push(item)
            await getThirdCom(item.comID)
          }
        }
        getThirdCom(comments.firstcom[key].secondcom[seckey].comID);
        comments.firstcom[key].secondcom[seckey].thirdcom = thirdcom;
      }  
    }
    console.log("All comments are", comments);
  }

}
