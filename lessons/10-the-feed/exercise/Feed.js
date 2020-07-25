import React, { useState, useEffect } from "react"
import FeedPost from "app/FeedPost"
import { loadFeedPosts, subscribeToNewFeedPosts } from "app/utils"
// import FeedFinal from './Feed.final'
// export default FeedFinal
export default Feed

function Feed() {
  const [newPosts, setNewPosts] = useState(null)
  const [posts, setPosts] = useState(null)
  const [limit, setLimit] = useState(3)
  const [time, setTime] = useState(Date.now())

  useEffect(() => {
    let isCurrent = true
    loadFeedPosts(time, limit).then((res) => {
      if (isCurrent) setPosts(res)

      return () => { isCurrent = false }
    }).catch((e) => console.log(e))
  }, [limit, time])

  useEffect(() => {
    return subscribeToNewFeedPosts(time, posts => {
      setNewPosts(posts)
    })
  }, [time])

  const viewMore = () => {
    setLimit(limit + 3)
  }

  const viewNew = () => {
    setTime(Date.now())
    setLimit(limit + newPosts.length)
  }

  return (
    <div className="Feed">
      {newPosts && newPosts.length > 0 ?
        <div className="Feed_button_wrapper">
          <button onClick={viewNew} className="Feed_new_posts_button icon_button">
            View {newPosts.length} New Posts
          </button>
        </div> : null}


      {posts && posts.length > 0 ? (
        posts.map((post, index) => (<FeedPost key={index} post={post} />))
      ) : null}


      <div className="Feed_button_wrapper">
        <button className="Feed_new_posts_button icon_button" onClick={viewMore}>View More</button>
      </div>
    </div>
  )
}

// you can delete this
const fakePost = {
  createdAt: Date.now() - 10000,
  date: "2019-03-30",
  message: "Went for a run",
  minutes: 45,
  uid: "0BrC0fB6r2Rb5MNxyQxu5EnYacf2"
}

