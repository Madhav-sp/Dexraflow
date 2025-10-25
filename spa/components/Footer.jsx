export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200">
      <div className="container-x py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src="/dexraflow-mark.svg" alt="Dexraflow" className="w-6 h-6"/>
          <span className="font-semibold">Dexraflow</span>
        </div>
        <p className="text-sm text-slate-500">© {new Date().getFullYear()} Dexraflow. All rights reserved.</p>
        <div className="flex gap-4 text-sm">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  )
}
