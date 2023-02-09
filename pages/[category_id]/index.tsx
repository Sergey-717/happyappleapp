import { Model, Prisma, Products } from "@prisma/client";
import prisma from "../../lib/prisma";
import Link from "next/link";
import { MainComponent } from "../../components/MainComponent";
import styles from "../../styles/Home.module.less";
import { useRouter } from "next/router";
import { Checkbox } from "@nextui-org/react";
import { Tooltip, Button, Text, Radio } from "@nextui-org/react";
import { Dropdown } from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { ProductNotFound } from "../../components/ProductNotFound";

interface FilterModel {
  [key: string]: {
    name: string;
    value: ReadonlyArray<any>;
  };
}

export default function ({
  products,
  models,
  filterModel,
  characteristics,
  categoryId,
}: {
  products: Products[];
  models: Model[];
  filterModel: FilterModel;
  characteristics: any;
  categoryId: string;
}) {
  const { query } = useRouter();
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [filteredModels, setFilteredModels] = useState<
    Record<string, ReadonlyArray<string>>
  >({});

  const changeFilterState = useCallback(
    (value: boolean, id: string, key: string) => {
      if (!filteredModels[key]?.length) {
        setFilteredModels({ ...filteredModels, [key]: [id] });
      } else {
        setFilteredModels(
          value
            ? { ...filteredModels, [key]: [...filteredModels[key], id] }
            : {
                ...filteredModels,
                [key]: filteredModels[key].filter(
                  (existedId) => existedId !== id
                ),
              }
        );
      }
    },

    [filteredModels]
  );

  const sortFilterState = useCallback(
    (value: string) => {
      if (value === "price ASC" || value === "price DESC") {
        setFilteredModels({
          ...filteredModels,
          ["order"]: [value],
        });
      } else {
        setFilteredModels({
          ...filteredModels,
          new: [value],
        });
      }
    },

    [filteredModels]
  );

  useEffect(() => {
    if (!Object.values(filteredModels).flatMap((x) => x).length) {
      setFilteredProducts(products);
      return;
    }
    (async () => {
      const params = Object.entries(filteredModels).reduce(
        (acc, [item, value]) => {
          if (!value.length) return acc;
          return { ...acc, [item]: value.join(",") };
        },
        {}
      );
      const data = await axios.get("/api/hello", {
        params: { ...params, categoryId },
      });
      setFilteredProducts(data.data);
    })();
  }, [filteredModels]);

  return (
    <MainComponent>
      <div className={styles.list}>
        <div className={styles.list__filters}>
          <div className={styles.list__filters__block}>
            <h3>Модель</h3>
            {models.map((el) => (
              <Checkbox
                id={el.id}
                key={el.id}
                color="gradient"
                label={el.name}
                onChange={(isChecked: boolean) =>
                  changeFilterState(isChecked, el.id, "modelId")
                }
              />
            ))}
          </div>
          {Object.entries(filterModel).map(([key, value]) => {
            return (
              <div className={styles.list__filters__block} key={value.name}>
                <h3>{value.name}</h3>
                {value.value.map((el) => (
                  <Checkbox
                    id={el.id}
                    key={el.id}
                    size="md"
                    color="gradient"
                    label={el.name}
                    value={el.name}
                    onChange={(isChecked: boolean) =>
                      changeFilterState(isChecked, el.id, "valueId")
                    }
                  />
                ))}
              </div>
            );
          })}
          <div className={styles.list__filters__block}>
            <Dropdown>
              <Dropdown.Button id="1" color="secondary" flat>
                Сортировать по цене
              </Dropdown.Button>
              <Dropdown.Menu
                aria-label="Static Actions"
                onAction={(key) => sortFilterState(key.toString())}
              >
                <Dropdown.Item key="price DESC">По убыванию</Dropdown.Item>
                <Dropdown.Item key="price ASC">По возрастанию</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
              <Dropdown.Button id="2" color="secondary" flat>
                Новые или подержанные
              </Dropdown.Button>
              <Dropdown.Menu
                onAction={(key) => sortFilterState(key as string)}
                aria-label="Static Actions"
              >
                <Dropdown.Item key="new">Только новые</Dropdown.Item>
                <Dropdown.Item key="NOT new">Только подержанные</Dropdown.Item>
                <Dropdown.Item key="all">Все</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div>
          <div className={styles.products}>
            {(!filteredProducts.length && <ProductNotFound />) ||
              filteredProducts.map((i) => {
                return (
                  <Link href={`/${query.category_id}/${i.id}`} key={i.id}>
                    <fieldset
                      className={`${styles.products__card} ${
                        i.new && styles.products__new
                      }`}
                      key={i.id}
                    >
                      <legend>{i.new ? "NEW!" : "used"}</legend>
                      <div className={styles.products__card__text}>
                        <Text
                          h2
                          css={{
                            textGradient:
                              "45deg, $purple600 -20%, $pink600 100%",
                            // color: "Purple",
                          }}
                          weight="bold"
                        >
                          {i.name}
                        </Text>
                        <div className={styles.products__card__characteristics}>
                          {characteristics[i.id].map(
                            (char: { name: string; value: string }) => (
                              <h3 key={char.name}>{char.value}</h3>
                            )
                          )}
                        </div>
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
        </div>
      </div>
    </MainComponent>
  );
}

export async function getServerSideProps({ params }: { params: any }) {
  const models = await prisma.model.findMany({
    where: { categoryId: params.category_id },
  });
  const products = await prisma.products.findMany({
    where: { modelId: { in: models.map((model) => model.id) } },
  });

  let filterModel: any = {};
  if (models.length) {
    const modelsValues = await prisma.$queryRaw<
      { name: string; value: string; valueId: string; charId: string }[]
    >`
    SELECT DISTINCT 
    "Characteristics".name,
    "Values".name as "value",
    "Values".id as "valueId",
    "Characteristics".id as "charId"
    FROM "Products"
    JOIN "Model" ON "Products"."modelId"="Model".id
    JOIN "ProductCharacteristicValues" ON "Products".id="ProductCharacteristicValues"."productId"
    JOIN "Values" ON "Values".id="ProductCharacteristicValues"."valueId"
    JOIN "Characteristics" ON "Characteristics".id="ProductCharacteristicValues"."characteristicId"
  WHERE "Model".id IN (${Prisma.join(models.map((p) => p.id))})
	ORDER BY name ASC 
  `;
    filterModel = modelsValues.reduce((filter, value, index) => {
      if (!filter[value.charId]) {
        filter[value.charId] = {
          name: value.name,
          value: [{ name: value.value, id: value.valueId }],
        };
        return filter;
      }
      filter[value.charId].value = [
        ...filter[value.charId].value,
        { name: value.value, id: value.valueId },
      ];
      return filter;
    }, {} as Record<string, { name: string; value: ReadonlyArray<unknown> }>);
  }
  let characteristics: Array<any> = [];
  if (products.length) {
    characteristics = await prisma.$queryRaw`
    SELECT
      "Characteristics".name AS char_name,
      "Values".name AS value_name,
      "Products".name,
      "Products".id
    FROM "Products"
      JOIN "ProductCharacteristicValues" ON "Products".id="ProductCharacteristicValues"."productId"
      JOIN "Values" ON "ProductCharacteristicValues"."valueId"="Values".id
      JOIN "Characteristics" ON "Characteristics".id="ProductCharacteristicValues"."characteristicId"
      JOIN "Model" ON "Model".id="Products"."modelId"
      WHERE "Products".id IN (${Prisma.join(products.map((p) => p.id))})
      ORDER BY char_name ASC 
  `;
  }

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
      categoryId: params.category_id,
    },
  };
}
