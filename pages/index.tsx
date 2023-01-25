import styles from "../styles/Home.module.less";
import { MainComponent } from "../components/MainComponent";
import prisma from "../lib/prisma";
import { GetStaticProps } from "next";
import { Categories, Products } from "@prisma/client";
import { CardOfProduct } from "../components/CardOfProduct";
import Link from "next/link";

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
      {/* {console.log(products)} */}

      <MainComponent>
        <div className={styles.products}>
          {categories.map((i) => {
            return (
              <CardOfProduct product={i} counter={1} key={i.id}></CardOfProduct>
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
  //     name: "iPhone 13 Pro Max",
  //     id: "iphone-13-pro-max",
  //     categoryId: "iphone",
  //     description: "",
  //     image: "/hA2.jpg",
  //   },
  // });

  //  Characteristics create
  // await prisma.characteristics
  //   .create({
  //     data: {
  //       name: "color",
  //     },
  //   })

  // ModelAvailibleCharacteristics create
  // await prisma.modelAvailibleCharacteristics.createMany({
  //   data: [
  //     {
  //       modelId: "iphone-13-pro-max",
  //       characteristicId: "memory",
  //     },
  //     {
  //       modelId: "iphone-13-pro-max",
  //       characteristicId: "color",
  //     },
  //   ],
  // });

  // Values create
  // await prisma.values.createMany({
  //   data: [
  //     {
  //       name: "Graphite",
  //     },
  //     {
  //       name: "Sierra Blue",
  //     },
  //     {
  //       name: "Alpine Green",
  //     },
  //     {
  //       name: "Pink",
  //     },
  //     {
  //       name: "Blue",
  //     },
  //     {
  //       name: "Purple",
  //     },
  //   ],
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
  //     {
  //       characteristicId: "color",
  //       valueId: "cld8g9mhh0007u0dqc2ljixuv",
  //     },
  //   ],
  // });

  // Product create
  // await prisma.products.create({
  //   data: {
  //     name: "iPhone 13 Pro Max",
  //     modelId: "iphone-13-pro-max",
  //     price: 69990,
  //     id: "iphone-13-pro-max-256gb-alpinegreen",
  //     description: "Отличное состояние, полный комплект, новая АКБ 100%",
  //     new: false,
  //     image: "/iphones/iphone-13-pro-max-green.jpg",
  //   },
  // });

  // ProductCharacteristicValues create
  // await prisma.productCharacteristicValues.createMany({
  //   data: [
  //     {
  //       productId: "iphone-13-pro-max-256gb-alpinegreen",
  //       valueId: "cld8n8fty000gu0eg8ddlmxma",
  //       characteristicId: "color",
  //     },
  //     {
  //       productId: "iphone-13-pro-max-256gb-alpinegreen",
  //       valueId: "cld8mqcc60009u0eg61wkkqwq",
  //       characteristicId: "memory",
  //     },
  //   ],
  // });

  // ModelAvailibleValues create
  // await prisma.modelAvailibleValues.createMany({
  //   data: [
  //     {
  //       modelId: "iphone-14-pro-max",
  //       valueId: "cld31ewhg0006u0054niikdq4",
  //       characteristicId: "color",
  //     },
  //     {
  //       modelId: "iphone-14-pro-max",
  //       valueId: "cld8g9mhh0007u0dqc2ljixuv",
  //       characteristicId: "color",
  //     },
  //     {
  //       modelId: "iphone-14-pro-max",
  //       valueId: "cld8g9mhh0005u0dqxscijgff",
  //       characteristicId: "color",
  //     },
  //     {
  //       modelId: "iphone-14-pro-max",
  //       valueId: "cld2ypqd10000u0qqo1rvjm15",
  //       characteristicId: "memory",
  //     },
  //     {
  //       modelId: "iphone-14-pro-max",
  //       valueId: "cld2ypqd10000u0qqo1rvjm14",
  //       characteristicId: "memory",
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

  const categories = await prisma.categories.findMany();
  const products = await prisma.products.findMany();

  // const countedCategories = categories.map((category: Categories) => {
  //   return {
  //     ...category,
  //     count: products.filter(
  //       (product: Products) => product.modelId === category.id
  //     ).length,
  //   };
  // });

  return {
    props: { categories, products },
    // revalidate: 20,
  };
};
