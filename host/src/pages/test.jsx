import Load from "../../loader";
const Component = Load("remote1","./widget")

export default function Home({ data }) {
  return (
    <div>
      Test
      <div id="container"></div>
      <Component count={0}/>
    
    </div>
  );
}






