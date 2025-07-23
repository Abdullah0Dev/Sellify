import { usePreviewUpdater } from "../../context/UpdateContext";
import ProductCard from "./ProductCard";
import placeholder from "../../assets/placeholder.png"; // Your local image or use a URL

const PreviewProduct: React.FC = () => {
  const { form } = usePreviewUpdater()

  return (
    <div className="relative max-lg:hidden max-w-1/3 h-full flex items-center justify-center ">
      <div className=" bg-[#F3F3F3] rounded-4xl flex items-center justify-center h-[70%] w-[320px] bg-[url(../assets/iphone.png)] bg-no-repeat bg-cover ">
        <ProductCard
          image={form.images[0] || placeholder}
          name={form.productName || "Untitled"}
          brand={form.brand || "with no branding"}
          average_rating={Number(form.rating).toFixed(1) || 4.5}
          price={Number(form.prices[0].price) || 3.99}
        />
      </div>
    </div>
  );
}


export default PreviewProduct