


function Homepage() {
  return (
    <>

      <div className="bg-image" style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/homepage.png)`,
        backgroundSize: 'cover'
      }}>
      </div>
    </>
  )
};
export default Homepage;