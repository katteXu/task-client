import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div>
      <div>poroduct</div>
      <div>
        <Link to="/" state={{ title: "from_product", data: 99 }}>
          返回
        </Link>
      </div>
    </div>
  );
};

export default Index;
