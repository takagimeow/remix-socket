import { json, Link, LoaderFunction, useCatch } from "remix";

export const loader: LoaderFunction = ({ request }) => {
  return json({});
};
export default function Index() {
  return (
    <div className="flex flex-col px-8 py-8">
      <Link
        className="flex-col border-2 bg-white text-slate-500 border-slate-100 rounded-xl px-4 py-4"
        to="/rooms/room-id-1"
      >
        <div className="flex-col animate-invert-hover-room-text hover:animate-hover-room-text hover:opacity-60">
          <div className="flex justify-between self-end mb-2">
            <div className="bg-cyan-500 rounded-lg px-2 py-0 align-middle items-center text-center">
              <span className="text-xs text-white font-bold self-center">
                会議
              </span>
            </div>
          </div>
          <div className="flex justify-between self-end">
            <h1 className="text-xl font-bold">ルーム1</h1>
          </div>
          <div className="flex justify-between self-end h-12"></div>
          <div className="flex justify-between self-end">
            <label>2022.02.10</label>
            <label>あと2日</label>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <div>
      <h1>Caught</h1>
      <p>Status: {caught.status}</p>
      <pre>
        <code>{JSON.stringify(caught.data, null, 2)}</code>
      </pre>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
      <p>The stack trace is:</p>
      <pre>{error.stack}</pre>
    </div>
  );
}