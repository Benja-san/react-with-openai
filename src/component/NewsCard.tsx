import { New } from "../model/New"
import styles from "./newsCard.module.css"

export const NewsCard = ({ article }: { article: New }) => {
  return (
    <article className={styles.card}>
      <h2>{article.title}</h2>
      <img src={article.picture} alt={article.title} />
      <p>{article.content}</p>
    </article>
  )
}
