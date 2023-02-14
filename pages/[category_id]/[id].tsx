import { Products } from "@prisma/client";
import prisma from "../../lib/prisma";
import { MainComponent } from "../../components/MainComponent";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { Button, Link } from "@nextui-org/react";

import styles from "../../styles/Home.module.less";
import { useState } from "react";

export default function Product({
  product,
  characteristics,
}: {
  product: Products;
  characteristics: { name: string; value: string }[];
}) {
  const [message, setMessage] = useState(
    "https://wa.me/79103964430?text=Здравствуйте!%20Меня%20заинтересовал"
  );
  return (
    <>
      <MainComponent>
        <div className={styles.products__card__id}>
          <img
            src={`${product.image}`}
            alt={product.modelId}
            className={`${styles.products__card__id__image}`}
          />
          <div className={styles.products__card__id__text}>
            <h1>
              {product.name}
              <div className={styles.products__card__newStyle}>
                {product.new ? "NEW!" : ""}
              </div>
            </h1>

            {characteristics.map((el: { name: string; value: string }) => (
              <h3 key={el.name}>
                {el.name}: {el.value}
              </h3>
            ))}
            <h3>{product.description}</h3>
            <h3>{product.price} ₽</h3>
            <Link href={message}>
              {/* ?text=Меня%20интересует%20ваше%20объявление%20о%20продаже */}
              <Button
                color="secondary"
                style={{ opacity: 0.8, width: "80%" }}
                onClick={() =>
                  setMessage(
                    message + ` ${product.name}%20за%20${product.price}`
                  )
                }
              >
                Купить
              </Button>
            </Link>
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
