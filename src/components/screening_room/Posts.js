export default function Posts({ room, postsEndRef }) {
  const formatTimestamp = (timestamp) => {
    const postDate = new Date(timestamp);

    const options = { timeZone: "America/Los_Angeles" };

    const currentDate = new Date();

    // Check if the post is from today
    if (
      postDate.getDate() === currentDate.getDate() &&
      postDate.getMonth() === currentDate.getMonth() &&
      postDate.getFullYear() === currentDate.getFullYear()
    ) {
      // Format the timestamp to hh:mm format
      return `at ${postDate.toLocaleTimeString("en-US", options)} today`;
    } else {
      // Format the timestamp to hh:mm format and the date to MM/DD/YYYY
      return `at ${postDate.toLocaleTimeString(
        "en-US",
        options
      )} ${postDate.toLocaleDateString("en-US", options)}`;
    }
  };

  return (
    <div>
      <h3>Discussion</h3>
      <div
        ref={postsEndRef}
        // style={{ height: 600 }}
        className="overflow-y-auto"
      >
        <ul className="list-none p-0">
          {room.posts
            .slice(0)
            .reverse()
            .map((post) => (
              <li
                key={post.id}
                className="mb-2 bg-gray-200 dark:bg-gray-400 rounded-lg p-4"
              >
                <div>
                  <span className="font-bold text-sm">
                    {post.author.username}{" "}
                  </span>
                  <span className="text-xs font-bold text-gray-500 mt-1">
                    {formatTimestamp(post.timestamp)}
                  </span>
                </div>
                <div className="text-gray-700 mt-2">{post.content}</div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
