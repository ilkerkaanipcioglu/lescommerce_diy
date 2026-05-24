import Header from "@/components/Header/Header";
import VideoPlayer from "@/components/VideoSection/VideoPlayer";
import MaterialList from "@/components/Lists/MaterialList";
import MasterList from "@/components/Lists/MasterList";
import ReadyProduct from "@/components/Product/ReadyProduct";

export default function Home() {
  return (
    <main>
      <Header />
      <VideoPlayer />
      <MaterialList />
      <MasterList />
      <ReadyProduct />
      <footer style={{
        textAlign: "center",
        padding: "3rem",
        color: "var(--text-muted)",
        borderTop: "1px solid var(--border)",
        background: "var(--surface)"
      }}>
        <p>&copy; {new Date().getFullYear()} DIYABI.COM - Tüm Hakları Saklıdır</p>
      </footer>
    </main>
  );
}
