import { Model, Prisma, Products } from "@prisma/client";
import prisma from "../../lib/prisma";
import Link from "next/link";
import { MainComponent } from "../../components/MainComponent";
import styles from "../../styles/Home.module.less";
import { useRouter } from "next/router";

interface FilterModel {
  [key: string]: {
    name: string;
    value: ReadonlyArray<string>;
  };
}

export default function ({
  products,
  models,
  filterModel,
  characteristics,
}: {
  products: Products[];
  models: Model[];
  filterModel: FilterModel;
  characteristics: any;
}) {
  const { query } = useRouter();
  return (
    <>
      <MainComponent>
        {console.log(characteristics)}

        {models.map((el) => (
          <button key={el.id}>{el.name}</button>
        ))}
        {Object.entries(filterModel).map(([key, value]) => {
          return (
            <div key={value.name}>
              <p>{value.name}</p>
              {value.value.map((el, i) => (
                <button key={el + i}>{el}</button>
              ))}
            </div>
          );
        })}
        <div className={styles.products}>
          {products.map((i) => {
            return (
              <Link href={`/${query.category_id}/${i.id}`} key={i.id}>
                {/* {console.log(i)} */}

                <fieldset
                  className={`${styles.products__card} ${
                    i.new && styles.products__new
                  }`}
                  key={i.id}
                >
                  <legend>{i.new ? "NEW!" : "used"}</legend>
                  <div className={styles.products__card__text}>
                    <h2>{i.name}</h2>
                    {characteristics[i.id].map(
                      (char: { name: string; value: string }) => (
                        <h3 key={char.name}>{char.value}</h3>
                      )
                    )}
                    <h3>{i.price} ₽</h3>
                  </div>
                  <div className="products__card__img">
                    <style jsx>
                      {`
                        .products__card__img {
                          background-image: url(${i.image});
                          background-repeat: no-repeat;
                          background-size: contain;
                          background-position: center;
                        }
                      `}
                    </style>
                  </div>
                </fieldset>
              </Link>
            );
          })}
        </div>
      </MainComponent>
    </>
  );
}

export async function getServerSideProps({ params }: { params: any }) {
  const models = await prisma.model.findMany({
    where: { categoryId: params.category_id },
  });
  const modelsValues = await prisma.$queryRaw<
    { name: string; value: string; charId: string; id: string }[]
  >`
    SELECT DISTINCT 
    "Characteristics".name,
    "Values".name as value,
    "Values".id as "valueId",
    "Characteristics".id as "charId"
    FROM "Model"
    JOIN "ModelAvailibleValues" ON "ModelAvailibleValues"."modelId"="Model".id
    JOIN "Characteristics" ON "Characteristics".id="ModelAvailibleValues"."characteristicId"
    JOIN "Values" ON "ModelAvailibleValues"."valueId"="Values".id
    JOIN "ProductCharacteristicValues" ON "ProductCharacteristicValues"."valueId"="Values".id
  `;
  const products = await prisma.products.findMany({
    where: { modelId: { in: models.map((model) => model.id) } },
  });
  const filterModel = modelsValues.reduce((filter, value) => {
    if (!filter[value.charId]) {
      filter[value.charId] = {
        name: value.name,
        value: [value.value],
      };

      return filter;
    }

    filter[value.charId].value.push(value.value);

    return filter;
  }, {} as any);

  const characteristics: Array<any> = await prisma.$queryRaw`
    SELECT
      "Characteristics".name AS char_name,
      "Values".name AS value_name,
      "Products".name,
      "Products".id
    FROM "Products"
      JOIN "ProductCharacteristicValues" ON "Products".id="ProductCharacteristicValues"."productId"
      JOIN "Values" ON "ProductCharacteristicValues"."valueId"="Values".id
      JOIN "Characteristics" ON "Characteristics".id="ProductCharacteristicValues"."characteristicId"
      WHERE "Products".id IN (${Prisma.join(products.map((p) => p.id))})
      ORDER BY char_name ASC 
  `;

  const characteristicsProductObj = characteristics.reduce((acc, item) => {
    if (acc[item.id]) {
      acc[item.id].push({ name: item.char_name, value: item.value_name });
    } else {
      acc[item.id] = [{ name: item.char_name, value: item.value_name }];
    }

    return acc;
  }, {});

  return {
    props: {
      products,
      models,
      filterModel,
      characteristics: characteristicsProductObj,
    },
  };
}
