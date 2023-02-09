import styles from "../styles/Home.module.less";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { Categories, Products } from "@prisma/client";

interface ICardOfProductProps {
  product: Products | Categories;
  counter: number;
}

export const CardOfProduct = ({ product, counter }: ICardOfProductProps) => {
  return (
    <>
      <Link className={styles.products__card} href={`/${product.id}`}>
        <div className={styles.products__card__text}>
          <h2>{product.name}</h2>
          <p>Товаров: {counter}</p>
          <Button color="secondary" style={{ opacity: 0.8 }}>
            Смотреть модели{" "}
          </Button>
        </div>
        <div className="products__card__img">
          <style jsx>
            {`
              .products__card__img {
                background-image: url(${product.image});
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
              }
            `}
          </style>
        </div>
      </Link>
    </>
  );
};
