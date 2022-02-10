import { Outlet } from "remix";

export default function Rooms() {
  return (
    <div className="relative w-full h-full">
      <Outlet />
    </div>
  )
}

export function CatchBoundary() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <Outlet />
    </div>
  );
}