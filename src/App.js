import './index.css'
import React from 'react'
import avatar from './images/avatar.png'
import avatar1 from './images/avatar02.png'
import avatar2 from './images/avatar03.png'
import { v4 as uuid } from 'uuid' //把 v4 重命名一下


//🔥🔥渲染 DOM 数据
//第一步，渲染评论数据，思路：用 state.xxx.map(item=><html></html>) 来获取列表数据
//第二步，渲染 tab 、评论列表和点赞、踩的状态，思路：用三元表达式来判断【动态类名】


//🔥🔥绑定点击事件去改变 tab 的 active 状态


//🔥🔥利用受控制组件，绑定评论的数据到 state 中

//🔥🔥点击【发表评论】的 button，拿到 state 中的评论数据并添加到 state 中去（本质是往 state.list 中添加数据）

//🔥🔥点击【删除评论】的 button，拿到 state 中的评论 id, 然后通过 filter 去过滤出这条评论并进行删除
//利用箭头函数的写法才能拿到自己遍历出来的 id！ onClick={ () => this.deleteComment(item.id) } 



//———————————————————————————————————————————————————————————————————————————————————————




// 处理【时间】这个事件对象
function formatTime (time) {

  //把时间格式化为 2022-05-27 的时间格式
  return (` ${time.getFullYear()} - ${time.getMonth() + 1} - ${time.getDate()} `)
}




class App extends React.Component {
  // 依赖的数据
  state = {
    // hot: 热度排序  time: 时间排序
    tabs: [
      {
        id: 1,
        name: '热度',
        type: 'hot' //用来储存 tab 激活状态
      },
      {
        id: 2,
        name: '时间',
        type: 'off'//用来储存 tab 激活状态
      }
    ],

    active: 'hot',//🚀表示 【tab 激活状态】,如果匹配到此状态则激活 tab

    list: [
      {
        id: 1,
        author: '小刘',
        comment: '这个方案非常哈好',
        time: new Date('2021-10-10 09:09:00'), //new 一个时间对象
        avatar: avatar,
        attitude: 1 // 🚀🚀 用来记录点赞的状态，1: 点赞 0：无态度 -1:踩
      },
      {
        id: 2,
        author: '小李',
        comment: '哎哟，不错哦',
        time: new Date('2021-10-11 09:09:00'),
        avatar: avatar1,
        attitude: 0// 🚀🚀 用来记录点赞的状态，1: 点赞 0：无态度 -1:踩
      },
      {
        id: 3,
        author: '小张',
        comment: '不打扰你了谢谢',
        time: new Date('2021-10-11 10:09:00'),
        avatar: avatar2,
        attitude: 1// 🚀🚀 用来记录点赞的状态，1: 点赞 0：无态度 -1:踩
      },
    ],
    comment: '',
  };


  //切 tab
  SwitchTab = (type) => { //🔥🔥传入下面 onClick 回调的参数！！
    console.log("点击了 tab")
    console.log("切换为", type)
    //点击谁，就把 type 属性赋值给 state 中的 active, 所以需要传入参数
    this.setState({
      active: type  //把【active 的值】传给 【点击的这个 tab 的 type】！！【type】 表示 tab 的状态值！！
    })
  }



  //获取输入框内的值
  textAreaChange = (e) => {
    this.setState({
      comment: e.target.value //把【数据存储到 state 中】
    })
  }



  //聚焦后清除评论框内的 placeholder
  focusFn = (e) => {
    // console.log(e.target.placeholder)
    e.target.placeholder = ''
  }

  //失焦后恢复论框内的 placeholder
  blurFn = (e) => {
    if (e.target.placeholder === '') {
      e.target.placeholder = '😄发条友善的评论吧'
    }
  }


  //新增评论(本质是往 state.list 中添加数据)
  submitFn = () => {
    this.setState({
      // 评论的模板结构
      list: [
        ...this.state.list, //拿到原来 state 中的数据 （人+名字+评论+时间）
        {
          id: uuid(), //自己生成独一无二的值, 利用 uuid 方法
          author: '小王',
          comment: 'this.state.comment', //🔥🔥这个应该换成 state 中的数据
          time: new Date(), //new 一个时间对象
          avatar: avatar,
          attitude: 0 // 🚀🚀 用来记录点赞的状态，1: 点赞 0：无态度 -1:踩
        }
      ]
    })
  }


  //删除回调出来的评论,拿到 state 中的评论 id, 然后通过 filter 去过滤出这条评论并进行删除
  deleteComment = (id) => {
    // console.log("删除评论", )d)
    this.setState({
      list: this.state.list.filter(
        item => item.id !== id //🍎🍎相当于不要这一条评论!!只是先屏蔽掉!!
      )
    })
  }


  //点赞 (实现逻辑：点击对象的【attitude】 如果是 1 则 【获取对应的评论 id】，然后把它【attitude】的改为 0, 🔥🔥 这里的 countItem 返回的就是 List 里边的一组数据！！因为在下面的 html 渲染内已经 map 遍历过了) 
  toggleLikeFn = (countItem) => {

    // console.log(countItem.attitude)

    //🔥🔥🔥声明两个字段！！
    const { attitude, id } = countItem
    this.setState({
      list: this.state.list.map(item=>{//🔥🔥🔥 替换为老值，在个数不变情况下，修改其中某一项的方法就可以用 map

      //判断 【 map 遍历出来的 state id】  是否跟我们选中的对象的 id【也就是点击后传入的 id】 匹配？如果匹配则改它的【attitude】
          if(item.id === id){
            return{
              //🔥🔥 先拓展运算一下拿出原来的数据
              ...item,
              attitude: attitude === 1 ? 0 : 1 //如果是 1 则改为 0 ，否则就是 1
            }
          }
          else{
            return item //否则就返回原来的 state
          }
        }
      )
  })
}



//————————————————————————————————————————————————————————————————————————————




//渲染层，获取数据
render() {
  return (
    <div className="App">
      <div className="comment-container">


        {/* 评论数 */}
        <div className="comment-head">
          <span>5 Comments</span>
        </div>


        {/* 排序 */}
        <div className="tabs-order">
          <ul className="sort-container">


            {/* 🚀🚀🚀 判断当前激活的是哪个【 Tab 】, 通过 state.name 拿到 */}
            {this.state.tabs.map(tab => (  //遍历 item （也就是 state ）`tab` 为 item ，可以自定义命名

              // 🚀🚀🚀 判断激活状态，如果匹配到此 state 的 type 为 active 的话，则给它添加一个激活的 on className，这时候就会显示高亮状态
              <li
                key={tab.id}
                className={tab.type === this.state.active ? 'on' : ''}//默认状态

                // onClick={ this.SwitchTab } //🔥🔥注意， onClick={ this.SwitchTab }  这样的写法没法透出参数，然后去绑定 active 状态！
                onClick={() => this.SwitchTab(tab.type)} //🔥🔥注意，相比于上面，这样的写法才可以把参数回调出去！！然后去绑定 active 状态！

              > 按{tab.name}排序 </li>
            ))}


            {/*  👇 方法二：可以用 on 来激活 li ，因为用上面已经【通过拿到的 name 的值 】来判断是哪个 tab，所以这里可以不要  */}
            {/* <li className="on"></li>
            <li>按时间排序</li> */}

          </ul>
        </div>

        {/* 添加评论的输入框 ,通过受控组件的方式去拿到 Value*/}
        <div className="comment-send">
          <div className="user-face">
            <img className="user-head" src={avatar} alt="" />
          </div>

          {/* 输入框 */}
          <div className="textarea-container">
            <textarea
              cols="80"
              rows="5"
              placeholder="😄发条友善的评论吧"
              className="ipt-txt"
              value={this.state.comment} //🚀绑定评论输入框的值
              onChange={this.textAreaChange} //🚀绑定评论输入框的的函数
              // <button onClick={ ()=> this.handler() }>点击我</button>
              onFocus={this.focusFn} //聚焦后清除数据
              onBlur={this.blurFn} //聚焦后清除数据
            />

            {/* 发表评论按钮 */}
            <button
              className="comment-submit"
              onClick={this.submitFn}
            >发表评论</button>

          </div>
          <div className="comment-emoji">
            <i className="face"></i>
            <span className="text">表情</span>
          </div>
        </div>

        {/* 评论的列表 */}
        <div className="comment-list">

          {/* 🌟🌟🌟 列表渲染，用 map 方法，🔥🔥遍历 【state】里边的数据 */}
          {this.state.list.map(item => (

            // 🚀记得加 key！，也就是【list item 】的 id！
            <div className="list-item" key={item.id}>
              <div className="user-face">
                <img className="user-head" src={item.avatar} alt="" />
              </div>
              <div className="comment">

                {/* author 用 {item.author} 来渲染*/}
                <div className="user">{item.author}</div>

                {/* 评论内容用 {item.comment} 来渲染*/}
                <p className="text">{item.comment}</p>


                <div className="info">

                  {/* 用 {item.time} 来调用时间方法的函数！ */}
                  <span className="time">{formatTime(item.time)}</span>





                  <span
                    //🔥🔥🔥 判断点赞是踩、赞还是无态度, 如果是 1 则相当于有两个类名，所以就选中了
                    className={item.attitude === 1 ? 'like liked' : 'like'}
                    onClick={() => this.toggleLikeFn(item)}//传入当前项（当前 Tab）的数据
                  >
                    <i className="icon" />
                  </span>
                  <span
                    //🔥🔥🔥 判断点赞是踩、赞还是无态度, 如果是 1 则相当于有两个类名，所以就选中了
                    className={item.attitude === -1 ? 'hate hated' : 'hate'}
                  >
                    <i className="icon" />
                  </span>




                  <span
                    className="reply btn-hover"
                    onClick={() => this.deleteComment(item.id)}
                  >删除</span>
                </div>
              </div>
            </div>

          ))}


        </div>
      </div>
    </div>
  )
}
}




export default App
