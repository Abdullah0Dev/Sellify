import PreviewProduct from "./common/PreviewProduct";
import ProductForm from "./product-form"

const CreateProduct = () => {

    return (
        <div className="w-screen h-screen  ">
            <div className="flex max-lg:flex-col h-full items-center gap-x-12 justify-between p-5">
                <ProductForm />
                <PreviewProduct />
            </div>
        </div>
    )
}

export default CreateProduct