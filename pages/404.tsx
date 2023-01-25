import styles from "../styles/Home.module.less";
import { MainComponent } from "../components/MainComponent";
import { useRouter } from "next/router";

export default function () {
  return (
    <>
      <MainComponent>
        <div>Page not found</div>
      </MainComponent>
    </>
  );
}
