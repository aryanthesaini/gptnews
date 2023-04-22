export default function NewsItem({
  index,
  body
}) {
  const title = `${body.slice(2, 25)}...`;

  return (
    <div className='accordian'>
      <div className='accordian-panel'>
        <h2 id={`panel${index+1}-heading`}>
          <button
            className='accordian-trigger'
            aria-controls={`panel${index+1}-content`}
            aria-expanded='true'>
            <span className='accordian-title' id={`panel${index+1}-title`}>
              {title}
            </span>
            <svg aria-hidden='true' className='accordian-icon'>
              {/* <use xlink:href='#news-svgrepo-com'></use> */}
            </svg>
          </button>
        </h2>
        <div
          className='accordian-content'
          id='panel1-content'
          aria-labelledby={`panel${index+1}-heading`}
          aria-hidden='false'
          role='region'>
          <p>{body}</p>
          <img
            className='accordian-image'
            src='https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
            alt='covid-19'
          />
        </div>
      </div>
    </div>
  )
}