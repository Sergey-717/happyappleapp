import React from "react";
import styles from "../styles/Home.module.less";

export const ProductNotFound = () => {
  return (
    <div className={styles.productNotFound}>
      <h2>По критериям поиска не найдено ни одного товара :(</h2>
      <h3>
        Измените критерии поиска, или свяжитесь с нами, и мы привезем Вам под
        заказ ✈️
      </h3>
    </div>
  );
};
