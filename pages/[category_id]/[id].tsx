import { Products } from "@prisma/client";
import prisma from "../../lib/prisma";
import { MainComponent } from "../../components/MainComponent";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import styles from "../../styles/Home.module.less";

export default function Product({
  product,
  characteristics,
}: {
  product: Products;
  characteristics: { name: string; value: string }[];
}) {
  // const prod = new Map(product);
  return (
    <>
      {/* {console.log(...product)} */}
      <MainComponent>
        <div className={`${styles.products__card__id}`}>
          <div>
            <img
              src={`${product.image}`}
              alt={product.modelId}
              style={{ maxHeight: "500px" }}
            />
          </div>
          <div>
            <h1>
              {product.name}{" "}
              {product.new && (
                <FiberNewIcon style={{ fontSize: "50px" }} color="success" />
              )}
            </h1>

            {characteristics.map((el: { name: string; value: string }) => (
              <h3 key={el.name}>
                {el.name}: {el.value}
              </h3>
            ))}
            <h2>{product.description}</h2>
            <h2>{product.price} ₽</h2>
          </div>
        </div>
      </MainComponent>
    </>
  );
}

export async function getServerSideProps({ params }: any) {
  const product = await prisma.products.findUnique({
    where: {
      id: params.id,
    },
  });

  const characteristics = await prisma.$queryRaw`
    SELECT
      "Characteristics".name AS name,
      "Values".name AS value
    FROM "Products"
    JOIN "ProductCharacteristicValues" ON "Products".id="ProductCharacteristicValues"."productId"
    JOIN "Values" ON "ProductCharacteristicValues"."valueId"="Values".id
    JOIN "Characteristics" ON "Characteristics".id="ProductCharacteristicValues"."characteristicId"
    WHERE "Products".id=${params.id}
`;
  return {
    props: { product, characteristics },
  };
}
