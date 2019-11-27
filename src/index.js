
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4002 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

      getPicture(imageURL, likeURL, commentsURL)

      function getPicture(){
        fetch(imageURL)
        .then(resp => {
          return resp.json()
        })
        .then(json => {
          let image = json
          showImage(image)
          showLike(image, likeURL)
          showComment(image, commentsURL)
        })
      }
      
      function showImage(image) {
      const imgEl = document.getElementById('image')
      const name = document.getElementById('name')

      imgEl.src = image.url
      name.textContent = image.name

      }

      function showLike(image, url) {
        const likeCount = image.like_count
        const  likeButton = document.getElementById('like_button')
        const  likes = document.getElementById('likes')

        likes.textContent = image.like_count
        likeButton.addEventListener('click', () =>{
          likeCount++
          likes.textContent = likeCount
          fetch(url, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "image_id": 4002
            })
          })
        })
      }
      
      function showComment(image, url) {
        let commentForm = document.getElementById('comment_form')
        let commentList = document.getElementById('comments')

        for(const comment of image.comments) {
          const commentItem = document.createElement('li')
          commentItem.textContent = comment.content
          commentList.append(commentItem)

          commentForm.addEventListener('clic', () => {
            ev.preventDefault()
            let newComment = ev.target.comment_input.value
            let newCommentLI = document.createElement('li')
            newCommentLI.textContent = comment.content
            commentList.append(newComment)
          
          fetch(url, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            bode: JSON.stringify({
              image_id:4002,
              content: newComment

            })
          })
          commentForm.reset();
        })
        }

      }
    
        
        
      
    
  
})
