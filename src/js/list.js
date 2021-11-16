// load more news
const newsMore = $('.list-more-news')
const newsList = $('.list-news')
let newsTimes = 0
newsMore.on('click', function () {
  newsMore.attr('disabled', 'disabled')
  // for example
  const url = newsTimes < 3 ? '../assets/news_example.json' : '../assets/empty.json'
  setTimeout(() => {
    $.ajax({
      url,
      success: function (data) {
        if (data) {
          let html = ''
          for (const item of data) {
            html += `<li class="list-news-item">
              <div class="list-news-item-img">
                <img src="${item.img}" alt="" />
              </div>
              <h3 class="list-news-item-title">${item.title}</h3>
              <p class="list-news-item-desc">${item.description}</p>
              <div class="list-news-item-footer g-flex-wrapper g-flex-align-start g-flex-justify-space-between">
                <a class="list-news-item-link" href="${item.url}" title="閱讀更多">閱讀更多</a>
                <div class="list-news-item-tag">
                  ${item.tags.map((tag) => {
                    return `<a href="${tag.url}" title="${tag.label}">${tag.label}</a>`
                  })}
                </div>
              </div>
            </li>`
          }
          newsList.append(html)
        } else {
          newsMore.remove()
        }
      },
      complete: function () {
        newsTimes++
        if (newsMore) newsMore.removeAttr('disabled')
      }
    })
  }, 1500)
})

// load more class
const classMore = $('.list-more-class')
const classList = $('.list-class')
let classTimes = 0
classMore.on('click', function () {
  classMore.attr('disabled', 'disabled')
  // for example
  const url = classTimes < 3 ? '../assets/class_example.json' : '../assets/empty.json'
  setTimeout(() => {
    $.ajax({
      url,
      success: function (data) {
        if (data) {
          let html = ''
          for (const item of data) {
            html += `<li class="list-class-item">
              <a href="${item.url}" title="${item.title}">
                ${
                  item.tag !== null &&
                  `<span class="list-class-item-tag" style="background-color: ${item.tag.color};">${item.tag.text}</span>`
                }
                <div class="list-class-item-img">
                  <img src="${item.img}" alt="" />
                </div>
                <h3 class="list-class-item-title">${item.title}</h3>
                <div class="list-class-item-ranking g-flex-wrapper g-flex-align-center">
                  <span>${item.rank.score}</span>
                  <div class="list-class-item-ranking-stars" data-stars="${item.rank.stars}" />
                  <span>(${item.rank.comments})</span>
                </div>
                <p class="list-class-item-info">課程時間 ${item.course.duration} 分鐘 | 上課人數 ${
              item.course.attendees
            } 人</p>
                <div class="list-class-item-footer g-flex-wrapper g-flex-align-end g-flex-justify-space-between">
                  <div class="list-class-item-lecturer g-flex-wrapper g-flex-align-start">
                    <div class="list-class-item-lecturer-img">
                      <img src="${item.lecturer.img}" alt="${item.lecturer.name}" />
                    </div>
                    <div class="list-class-item-lecturer-info">
                      <p class="list-class-item-lecturer-name">${item.lecturer.name}</p>
                      <p class="list-class-item-lecturer-dept">${item.lecturer.department}</p>
                    </div>
                  </div>
                  <div class="list-class-item-price">NT$${`${item.price}`.replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    ','
                  )}</div>
                </div>
              </a>
            </li>`
          }
          classList.append(html)
        } else {
          classMore.remove()
        }
      },
      complete: function () {
        classTimes++
        if (classMore) classMore.removeAttr('disabled')
      }
    })
  }, 1500)
})
