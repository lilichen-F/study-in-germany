import { Link } from 'react-router-dom';
import PortalCard from '../components/PortalCard';
import Announcements from '../components/Announcements';
import HotSchoolsCarousel from '../components/HotSchoolsCarousel';
import SchoolIcon from '../assets/icons/SchoolIcon';
import BoardIcon from '../assets/icons/BoardIcon';
import FaqIcon from '../assets/icons/FaqIcon';
import MyPostsIcon from '../assets/icons/MyPostsIcon';
import EduIcon from '../assets/icons/EduIcon';
import BellIcon from '../assets/icons/BellIcon';

/**
 * DS v4.0 Portal 首頁。
 * 結構：Hero → Portal (5 卡) → 熱門語校 → 最新公告
 */
export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="text-center py-8">
        <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/15
                        text-brand-burgundy text-xs font-medium">
          留德資訊站 · v4.1
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight">
          德國語校、住宿、生活資訊
          <span className="text-brand-burgundy">.</span>
        </h1>
        <p className="mt-3 text-content-secondary max-w-xl mx-auto">
          給留德新手與在德華人的三個小工具：語校真實評價、生活佈告欄、常見問答。
          內容全公開，寫入需登入以確保問責。
        </p>
      </section>

      {/* Portal */}
      <section>
        <div className="text-xs text-content-muted mb-3 uppercase tracking-wider">Portal</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <PortalCard
            to="/schools"
            title="語言學校"
            description="查看語校資料、學生評價、學費資訊"
            icon={<SchoolIcon className="w-full h-full" />}
          />
          <PortalCard
            to="/board"
            title="生活佈告欄"
            description="出租、求租、二手交易"
            icon={<BoardIcon className="w-full h-full" />}
          />
          <PortalCard
            to="/faq"
            title="常見問答"
            description="簽證、健保、封鎖帳戶、生活疑問"
            icon={<FaqIcon className="w-full h-full" />}
          />
          <PortalCard
            to="/edu"
            title="學用板塊"
            description="簽證、落地、延簽、獎學金、政策"
            icon={<EduIcon className="w-full h-full" />}
          />
          <PortalCard
            to="/my-posts"
            title="我的資料"
            description="管理自己的評價與貼文"
            icon={<MyPostsIcon className="w-full h-full" />}
          />
        </div>
      </section>

      {/* Hot Schools */}
      <section>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-lg font-medium">熱門語校</h2>
          <Link to="/schools" className="text-xs no-underline">
            全部語校 →
          </Link>
        </div>
        <HotSchoolsCarousel />
      </section>

      {/* Announcements */}
      <section>
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="text-lg font-medium">最新公告</h2>
          <div className="flex items-center gap-2 text-content-muted">
            <BellIcon className="w-4 h-4" />
            <span className="text-xs">最近 5 則</span>
          </div>
        </div>
        <Announcements />
      </section>
    </div>
  );
}
