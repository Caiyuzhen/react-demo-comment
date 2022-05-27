import './index.css'
import avatar from './images/avatar.png'
import avatar1 from './images/avatar02.png'
import avatar2 from './images/avatar03.png'



//第一步，渲染评论数据

//思路：用 state.xxx.map(item=><html></html>) 来获取列表数据

//第二步，渲染 tab 、评论列表和点赞、踩的状态
//思路：用三元表达式来判断【动态类名】

// 依赖的数据
const state = {
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
  active: 'hot',//表示 tab 激活状态,如果匹配到此状态则激活 tab
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

      attitude: -1// 🚀🚀 用来记录点赞的状态，1: 点赞 0：无态度 -1:踩
    }
  ],
}




// 处理时间对象
function formatTime (time) {

  //时间格式化为 2022-05-27 的时间格式
  return ` ${time.getFullYear()} - ${time.getMonth() + 1} - ${time.getDate()} `
}





//渲染层，获取数据
function App () {
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


            {/* 🚀🚀🚀 拿到 tab 的名字, 通过 name 拿到 */}
            {state.tabs.map(item =>


              // 🚀🚀🚀 判断激活状态，如果匹配到此 state 的 type 为 active 的话，则给它添加一个激活的 on className，这时候就会显示高亮状态
              <li key={item.id} className={item.type === state.active ? 'on' : ''}>   按{item.name}排序   </li>

            )}



            {/*  👇 用 on 来激活 li ，用上面的写法了,通过拿到的 name 来判断是哪个 tab，所以可以不要*/}
            {/* <li className="on"></li>
            <li>按时间排序</li> */}

          </ul>
        </div>

        {/* 添加评论的输入框 */}
        <div className="comment-send">
          <div className="user-face">
            <img className="user-head" src={avatar} alt="" />
          </div>
          <div className="textarea-container">
            <textarea
              cols="80"
              rows="5"
              placeholder="发条友善的评论"
              className="ipt-txt"
            />
            <button className="comment-submit">发表评论</button>
          </div>
          <div className="comment-emoji">
            <i className="face"></i>
            <span className="text">表情</span>
          </div>
        </div>

        {/* 评论的列表 */}
        <div className="comment-list">

          {/* 🌟🌟🌟 列表渲染，用 map 方法 */}
          {state.list.map(item => (

            // 🚀记得加 key！，也就是list item 的 id！
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


                  {/* 判断点赞是踩、赞还是无态度 */}
                  <span className={item.attitude === 1 ? 'like liked' : 'like'} >
                    <i className="icon" />
                  </span>
                  <span className={item.attitude === -1 ? 'hate hated' : 'hate'}>
                    <i className="icon" />
                  </span>


                  <span className="reply btn-hover">删除</span>
                </div>
              </div>
            </div>

          ))}


        </div>
      </div>
    </div>
  )
}



export default App
