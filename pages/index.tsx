import styles from "../styles/Home.module.less";
import { MainComponent } from "../components/MainComponent";
import prisma from "../lib/prisma";
import { GetStaticProps } from "next";
import { Categories, Products } from "@prisma/client";
import { CardOfProduct } from "../components/CardOfProduct";

export default function Home({
  categories,
  products,
}: {
  categories: Categories[];
  products: Products[];
}) {
  return (
    <>
      {/* {console.log(categories)} */}

      <MainComponent>
        <div className={styles.products}>
          {categories
            .filter((x) => x.counter)
            .map((i) => {
              return (
                <CardOfProduct
                  product={i}
                  counter={i.counter}
                  key={i.id}
                ></CardOfProduct>
              );
            })}
        </div>
      </MainComponent>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  //  Model create
  // await prisma.model.create({
  //   data: {
  //     name: "Watch 3",
  //     id: "watch-3",
  //     categoryId: "watch",
  //     description: "Watch 3",
  //     image: "/hA2.jpg",
  //   },
  // });

  //  Characteristics create
  // await prisma.characteristics.create({
  //   data: {
  //     name: "Размер",
  //     id: "size"
  //   },
  // });

  // ModelAvailibleCharacteristics create
  // await prisma.modelAvailibleCharacteristics.createMany({
  //   data: [
  //     {
  //       modelId: "watch-3",
  //       characteristicId: "size",
  //     },
  //     {
  //       modelId: "watch-3",
  //       characteristicId: "color",
  //     },
  //   ],
  // });

  // Values create
  // await prisma.values.create({
  //   data: {
  //     name: "42mm",
  //   },
  // });

  //  CharacteristicAvailibleValues create
  // await prisma.characteristicAvailibleValues.createMany({
  //   data: [
  //     {
  //       characteristicId: "color",
  //       valueId: "cld8g9mhh0005u0dqxscijgff",
  //     },
  //     {
  //       characteristicId: "color",
  //       valueId: "cld8g9mhh0006u0dqvuolcvqt",
  //     },
  //
  //   ],
  // });

  // Product create
  // await prisma.products.create({
  //   data: {
  //     name: "Watch 3",
  //     modelId: "watch-3",
  //     price: 16100,
  //     id: "watch-3-42mm-silver",
  //     description: "Новые запечатанные часы, 1 год гарантии",
  //     new: true,
  //     image: "",
  //   },
  // });

  // ProductCharacteristicValues create
  // await prisma.productCharacteristicValues.createMany({
  //   data: [
  //     {
  //       productId: "watch-3-42mm-silver",
  //       valueId: "cld8g9mhh0005u0dqxscijgff",
  //       characteristicId: "color",
  //     },
  //     {
  //       productId: "watch-3-42mm-silver",
  //       valueId: "cldd1zrql000iu0ecfc0ckzgb",
  //       characteristicId: "size",
  //     },
  //   ],
  // });

  // ModelAvailibleValues create
  // await prisma.modelAvailibleValues.createMany({
  //   data: [
  //     {
  //       modelId: "watch-3",
  //       valueId: "cld8g9mhh0005u0dqxscijgff",
  //       characteristicId: "color",
  //     },
  //     {
  //       modelId: "watch-3",
  //       valueId: "cldd1zrql000iu0ecfc0ckzgb",
  //       characteristicId: "size",
  //     },
  //   ],
  // });

  //  PRODUCT
  // Product: "14-pro-max-new-99000"
  // Category: "iphone"
  // ModelId: "iphone-14-pro-max"

  // Characteristic memory: "memory"
  // Value memory: "cld2ypqd10000u0qqo1rvjm14"
  // CharacteristicAvailibleValues memory: "cld2z05x00002u005opq6cfrs"
  // ModelAvailibleValues memory: "cld306v3l0003u005h1dr3zcf"
  // ProductCharacteristicValues memory: "3130085b-6343-4328-abc9-f41cebb1387f"

  // Characteristic color: "color"
  // Value color: "cld31ewhg0006u0054niikdq4"
  // CharacteristicAvailibleValues color: "cld31hja20009u005kzugikq9"
  // ModelAvailibleValues color: "cld31p7ft000bu00533tasslx"
  // ProductCharacteristicValues color: "aaa85d5c"-ab2a-4944-ac9f-e65fd435e95e

  const categories = await prisma.$queryRaw`
SELECT "Categories".*,
COUNT("Products".id)::int as counter
FROM "Categories"
LEFT JOIN "Model" ON "Model"."categoryId"="Categories".id
LEFT JOIN "Products" ON "Products"."modelId"="Model".id
GROUP BY "Categories".id
  
`;

  const products = await prisma.products.findMany();

  return {
    props: { categories, products },
    // revalidate: 20,
  };
};
