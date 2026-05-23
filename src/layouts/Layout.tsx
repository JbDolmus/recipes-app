import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Modal from "../components/Modal";
import { useAppStore } from "../stores/useAppStore";
import { useEffect } from "react";
import Notification from "../components/Notification";

export default function Layout() {
  const { loadFromLocalStorage } = useAppStore();

  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  return (
    <>
      <Header />

      <main className="container mx-auto py-16">
        <Outlet />
      </main>

      <Modal />
      <Notification />
    </>
  )
}
