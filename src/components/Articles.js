import { RiHeart2Line } from 'react-icons/ri';
import { BiComment } from 'react-icons/bi';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

async function fetchArticles(page, tag) {
  const res = await fetch(`https://dev.to/api/articles?per_page=10&page=${page}&tag=${tag}`);
  if (!res.ok) {
    throw new Error('Network response failed')
  }
  return res.json();
}

function Articles() {
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState("") // leave open so you get most recent articles first

  let randomColor = Math.floor(Math.random() * 16777215).toString(16);

  const { status, data, error, isFetching } = useQuery(
    ['articles', page, tag],
    () => fetchArticles(page, tag),
    { keepPreviousData: true, staleTime: 5000, refetchOnWindowFocus: false }
  )


  useEffect(() => {
    window.scrollTo(0, 0);
    randomColor = Math.floor(Math.random() * 16777215).toString(16);
  }, [data]);

  return (
    <div className="container">
      <div>
        {status === "loading" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <nav className="margin-block-20" aria-label="Main">
              <button onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={page === 1}>Previous</button>
              <button onClick={() => setPage(old => old + 1)} disabled={page === 2800}>Next</button>
            </nav>
            <div>
              {data.map((article) => (
                <article key={article.id}>
                  {article.cover_image &&
                    <img src={article.cover_image} alt={article.title} />
                  }
                  <div className="border-top padding-20">
                    <div className="flex align-center">
                      <div className="margin-right-10">
                        <img className="br-100" src={article.user.profile_image_90} alt="" />
                      </div>
                      <div>
                        <div className="modal-relative">
                          <p className="bolder pointer">{article.user.name}</p>
                          <p>{article.readable_publish_date}</p>
                        </div>
                        <div className="modal">
                          <div className="accent-bg" style={{ backgroundColor: `#${randomColor}` }}></div>
                          <div className="flex align-center">
                            <div className="modal-margin">
                              <img className="br-100 w-50 margin-right-10" src={article.user.profile_image_90} alt="" />
                            </div>
                            <h2>{article.user.name}</h2>
                          </div>
                          <button className="margin-block-20 pointer">Follow</button>
                          <div className="modal-padding">
                            <div>
                              <h3>Profile</h3>
                              <a href={`https://dev.to/${article.user.username}`} target="_blank" rel="noreferrer" className="flex align-center justify-start">
                                @{article.user.username}
                              </a>
                            </div>
                            {article.user.website_url &&
                              <div>
                                <h3>Personal</h3>
                                <a href={article.user.website_url} target="_blank" rel="noreferrer" className="flex align-center justify-start">
                                  Website
                                </a>
                              </div>
                            }
                            {article.user.twitter_username &&
                              <div>
                                <h3>Twitter</h3>
                                <a href={`https://twitter.com/${article.user.twitter_username}`} target="_blank" rel="noreferrer" className="flex align-center justify-start">
                                  @{article.user.twitter_username}
                                </a>
                              </div>
                            }
                            {article.user.github_username &&
                              <div>
                                <h3>Github</h3>
                                <a href={`https://github.com/${article.user.github_username}`} target="_blank" rel="noreferrer" className="flex align-center justify-start">
                                  @{article.user.github_username}
                                </a>
                              </div>
                            }
                          </div>

                        </div>
                      </div>
                    </div>
                    <div>
                      <h1 className="title-margin"><a href={article.url} target="_blank" rel="noreferrer">{article.title}</a></h1>
                      <div className="flex align-center wrap">
                        {article.tag_list.map((tag, index) => {
                          return (
                            <div key={index} className="margin-right-10 pointer tag-bg" onClick={() => setTag(tag)}>
                              {`#${tag}`}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                    <div className="flex align-center justify-between">
                      <div className="flex">
                        <div className="flex align-center margin-right-30">
                          <div className="margin-right-10 pointer">
                            <RiHeart2Line />
                          </div>
                          <div>
                            {article.positive_reactions_count} reactions
                          </div>
                        </div>
                        <div className="flex align-center">
                          <div className="margin-right-10 pointer">
                            <BiComment />
                          </div>
                          <div>
                            {article.comments_count} comments
                          </div>
                        </div>
                      </div>
                      <div>
                        {article.reading_time_minutes} min read
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <nav className="margin-block-20">
              <button onClick={() => setPage(old => Math.max(old - 1, 1))} disabled={page === 1}>Previous</button>
              <button onClick={() => setPage(old => old + 1)} disabled={page === 2800}>Next</button>
            </nav>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
}

export default Articles;

/* 

[
{
"type_of": "article",
"id": 194541,
"title": "There's a new DEV theme in town for all you 10x hackers out there (plus one actually useful new feature)",
"description": "",
"cover_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--74Bl23tz--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--xU8cbIK4--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/8a39dzf3oovzc2snl7iv.png",
"readable_publish_date": "Oct 24",
"social_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--SeMxdKIa--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--xU8cbIK4--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://thepracticaldev.s3.amazonaws.com/i/8a39dzf3oovzc2snl7iv.png",
"tag_list": [
"meta",
"changelog",
"css",
"ux"
],
"tags": "meta, changelog, css, ux",
"slug": "there-s-a-new-dev-theme-in-town-for-all-you-10x-hackers-out-there-plus-one-actually-useful-new-feature-2kgk",
"path": "/devteam/there-s-a-new-dev-theme-in-town-for-all-you-10x-hackers-out-there-plus-one-actually-useful-new-feature-2kgk",
"url": "https://dev.to/devteam/there-s-a-new-dev-theme-in-town-for-all-you-10x-hackers-out-there-plus-one-actually-useful-new-feature-2kgk",
"canonical_url": "https://dev.to/devteam/there-s-a-new-dev-theme-in-town-for-all-you-10x-hackers-out-there-plus-one-actually-useful-new-feature-2kgk",
"comments_count": 37,
"positive_reactions_count": 12,
"public_reactions_count": 142,
"collection_id": null,
"created_at": "2019-10-24T13:41:29Z",
"edited_at": "2019-10-24T13:56:35Z",
"crossposted_at": null,
"published_at": "2019-10-24T13:52:17Z",
"last_comment_at": "2019-10-25T08:12:43Z",
"published_timestamp": "2019-10-24T13:52:17Z",
"reading_time_minutes": 15,
"user": {
"name": "Ben Halpern",
"username": "ben",
"twitter_username": "bendhalpern",
"github_username": "benhalpern",
"website_url": "http://benhalpern.com",
"profile_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--Y1sq1tFG--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/1/f451a206-11c8-4e3d-8936-143d0a7e65bb.png",
"profile_image_90": "https://res.cloudinary.com/practicaldev/image/fetch/s--DcW51A6v--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/1/f451a206-11c8-4e3d-8936-143d0a7e65bb.png"
},
"organization": {
"name": "The DEV Team",
"username": "devteam",
"slug": "devteam",
"profile_image": "https://res.cloudinary.com/practicaldev/image/fetch/s--0kDBq1Ne--/c_fill,f_auto,fl_progressive,h_640,q_auto,w_640/https://thepracticaldev.s3.amazonaws.com/uploads/organization/profile_image/1/0213bbaa-d5a1-4d25-9e7a-10c30b455af0.png",
"profile_image_90": "https://res.cloudinary.com/practicaldev/image/fetch/s--8tTU-XkZ--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://thepracticaldev.s3.amazonaws.com/uploads/organization/profile_image/1/0213bbaa-d5a1-4d25-9e7a-10c30b455af0.png"
}
}
]
*/
