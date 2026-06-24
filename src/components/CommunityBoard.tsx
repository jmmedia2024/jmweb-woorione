import React, { useState, useEffect } from "react";
import { 
  MessageSquare, 
  HelpCircle, 
  PlusCircle, 
  Search, 
  User, 
  Calendar, 
  Eye, 
  Send, 
  Check, 
  AlertCircle,
  Pin
} from "lucide-react";
import { INITIAL_POSTS } from "../data";
import { CommunityPost, CommunityReply } from "../types";

interface BoardProps {
  fontRatio: number;
  highContrast: boolean;
  activeSubSection?: string;
}

export default function CommunityBoard({ fontRatio, highContrast, activeSubSection }: BoardProps) {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Selected post detail
  const [openedPostId, setOpenedPostId] = useState<string | null>(null);

  // Form states - Reply
  const [replyAuthor, setReplyAuthor] = useState("");
  const [replyContent, setReplyContent] = useState("");

  // Form states - New Post
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newCategory, setNewCategory] = useState<CommunityPost["category"]>("자유게시판");
  const [newContent, setNewContent] = useState("");

  const categories = ["전체", "공지사항", "자유게시판", "자원봉사 신청", "재정 투명성"];

  // Initialize
  useEffect(() => {
    const saved = localStorage.getItem("woori_board");
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      setPosts(INITIAL_POSTS);
      localStorage.setItem("woori_board", JSON.stringify(INITIAL_POSTS));
    }

    // Deep link from subView GNB redirection
    if (activeSubSection === "notice") {
      setSelectedCategory("공지사항");
    } else if (activeSubSection === "volunteer") {
      setSelectedCategory("자원봉사 신청");
    } else if (activeSubSection === "qna") {
      setSelectedCategory("자유게시판");
    }
  }, [activeSubSection]);

  const handlePostOpened = (postId: string) => {
    setOpenedPostId(openedPostId === postId ? null : postId);
    
    // Increment views locally
    const updated = posts.map(p => {
      if (p.id === postId) {
        return { ...p, views: p.views + 1 };
      }
      return p;
    });
    setPosts(updated);
    localStorage.setItem("woori_board", JSON.stringify(updated));
  };

  const handleAddReply = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!replyAuthor || !replyContent) {
      alert("댓글 작성자 닉네임과 내용란을 모두 기재해야 등록이 완수됩니다.");
      return;
    }

    const newReply: CommunityReply = {
      id: "rep-" + Date.now(),
      author: replyAuthor,
      content: replyContent,
      createdAt: new Date().toISOString().slice(0, 10)
    };

    const updated = posts.map(p => {
      if (p.id === postId) {
        return { ...p, replies: [...p.replies, newReply] };
      }
      return p;
    });

    setPosts(updated);
    localStorage.setItem("woori_board", JSON.stringify(updated));
    setReplyAuthor("");
    setReplyContent("");
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAuthor || !newContent) {
      alert("글제목, 작성자, 본문 구동내역을 모두 채워주십시오!");
      return;
    }

    const newPost: CommunityPost = {
      id: "post-" + Date.now(),
      title: newTitle,
      author: newAuthor,
      category: newCategory,
      content: newContent,
      createdAt: new Date().toISOString().slice(0, 10),
      views: 1,
      replies: [],
      isImportant: newCategory === "공지사항"
    };

    const updated = [newPost, ...posts];
    setPosts(updated);
    localStorage.setItem("woori_board", JSON.stringify(updated));

    // Clear
    setNewTitle("");
    setNewAuthor("");
    setNewContent("");
    setShowWriteForm(false);
    setSelectedCategory(newCategory);
  };

  // Filter posts
  const filteredPosts = posts.filter(p => {
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.author.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === "전체" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12 animate-fade-in text-slate-800" style={{ fontSize: `${16 * fontRatio}px` }}>
      
      {/* Structural Header */}
      <div className="border-b border-slate-100 pb-5 max-w-2xl flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase text-blue-600 tracking-wider">Communication Board</span>
          <h1 className="text-3xl font-black text-slate-900 mt-1">우리원 양방향 소통마당</h1>
          <p className="text-slate-500 font-semibold mt-1">공지사항 전달, 자원봉사 요청, 자유로운 질문답변이 연동되는 그누보드 연동관입니다.</p>
        </div>
        {!showWriteForm && (
          <button
            id="open-write-form-btn"
            onClick={() => setShowWriteForm(true)}
            className="px-5 py-3.5 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-1.5 hover:bg-blue-700 transition-all cursor-pointer"
          >
            <PlusCircle className="w-5 h-5 text-white" />
            <span>새 소통 글 올리기</span>
          </button>
        )}
      </div>

      {/* Write Post Panel (Form) */}
      {showWriteForm && (
        <section className={`p-6 md:p-8 rounded-3xl border space-y-6 ${
          highContrast ? "bg-black border-yellow-400 text-yellow-300" : "bg-slate-50 border-slate-200"
        }`}>
          <div className="flex justify-between items-center border-b pb-3 border-slate-200">
            <h3 className="font-extrabold text-lg flex items-center gap-2">
              <PlusCircle className="text-blue-600 w-5 h-5" />
              <span>자유글 및 봉사지원서 작성</span>
            </h3>
            <button
              id="cancel-write-post-btn"
              onClick={() => setShowWriteForm(false)}
              className="text-xs font-bold text-slate-500 hover:text-slate-900 border px-3 py-1.5 rounded-lg bg-white"
            >
              글작성 취소
            </button>
          </div>

          <form onSubmit={handleAddPost} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">소형 범주 선택 (Category)</label>
                <select
                  id="new-post-category"
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as any)}
                  className="w-full p-2.5 border border-slate-200 bg-white rounded-xl text-xs font-bold text-slate-700"
                >
                  <option value="자유게시판">자유게시판 목록</option>
                  <option value="자원봉사 신청">자원봉사 신청서</option>
                </select>
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-bold text-slate-600">글 제목 (Subject)</label>
                <input
                  id="new-post-title"
                  type="text"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="제목을 간결하게 기입하세요"
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">작성자 명의 (Author)</label>
                <input
                  id="new-post-author"
                  type="text"
                  value={newAuthor}
                  onChange={e => setNewAuthor(e.target.value)}
                  placeholder="예: 김정착 (가명가능)"
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-white text-xs"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">보안 코드 설정 (Secure)</label>
                <input
                  type="password"
                  placeholder="**** (임의 비밀번호)"
                  disabled
                  className="w-full p-2.5 border border-slate-200 rounded-xl bg-slate-100 text-slate-400 text-xs"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-600">상세 소통 본문 (Content)</label>
              <textarea
                id="new-post-content"
                rows={5}
                value={newContent}
                onChange={e => setNewContent(e.target.value)}
                placeholder="전달하고 싶은 소식이나 문의 내용을 자유롭고 예의 바르게 가감없이 적어주세요."
                className="w-full p-4 border border-slate-200 rounded-xl bg-white text-xs"
              ></textarea>
            </div>

            <button
              id="new-post-submit-btn"
              type="submit"
              className="w-full py-4.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl text-base shadow shadow-md transition-all cursor-pointer"
            >
              ✍️ 본 자유글 웹 게재 전송
            </button>
          </form>
        </section>
      )}

      {/* Search and Category navigation */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-50 p-3 rounded-2xl border">
        
        {/* Flat list Categories Filter */}
        <div className="flex flex-wrap gap-1">
          {categories.map((cat, idx) => (
            <button
              id={`board-category-btn-${cat}`}
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-extrabold cursor-pointer transition-all ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Board Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
          <input
            id="board-search-input"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="제목, 본문 글 내용 검색..."
            className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl bg-white text-xs"
          />
        </div>

      </section>

      {/* Lists of community GnuBoard posts */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="p-16 text-center italic text-slate-450 border rounded-2xl bg-white">
            동행 마당에 등록된 소통 글이 파악되지 않습니다.
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isOpened = openedPostId === post.id;
            return (
              <div 
                id={`post-envelope-${post.id}`}
                key={post.id}
                className={`border rounded-2.5xl overflow-hidden transition-all ${
                  post.isImportant 
                    ? "border-amber-300 bg-amber-50/10" 
                    : "border-slate-150 bg-white"
                }`}
              >
                {/* Header Row Click list */}
                <div 
                  id={`post-header-click-${post.id}`}
                  onClick={() => handlePostOpened(post.id)}
                  className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 select-none"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {post.isImportant && (
                        <span className="bg-amber-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded flex items-center gap-0.5 shadow-2xs">
                          <Pin className="w-2.5 h-2.5 rotate-45" />
                          <span>중요</span>
                        </span>
                      )}
                      <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {post.category}
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-black text-slate-900 leading-tight">
                      {post.title}
                    </h3>
                  </div>

                  {/* Metadata line block */}
                  <div className="flex items-center gap-4 text-slate-500 text-xs font-semibold shrink-0">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 opacity-60" />
                      <span>{post.author}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 opacity-60" />
                      <span>{post.createdAt}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 opacity-60" />
                      <span>{post.views}</span>
                    </span>
                    <span className="bg-blue-105 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded-full">
                      답변 {post.replies.length}
                    </span>
                  </div>
                </div>

                {/* Expanded content view */}
                {isOpened && (
                  <div className="px-5 pb-6 border-t border-slate-100 bg-white animate-fade-in text-slate-800">
                    <div className="py-6 whitespace-pre-wrap leading-relaxed text-sm text-slate-700 font-medium border-b border-slate-100">
                      {post.content}
                    </div>

                    {/* Replies segment */}
                    <div className="pt-6 space-y-4">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                        <span>의견 및 운영진 답변 토론 ({post.replies.length})</span>
                      </h4>

                      {/* Lists of replies */}
                      <div className="space-y-2 max-w-2xl">
                        {post.replies.map((rep) => (
                          <div key={rep.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                            <div className="flex items-center justify-between text-xxs font-bold text-slate-400">
                              <span className="text-slate-800 font-bold flex items-center gap-1">
                                <User className="w-3 h-3 text-slate-500" />
                                <span>{rep.author}</span>
                                {rep.author === "채신아" && (
                                  <span className="bg-orange-600 text-white text-[8px] font-black px-1.5 py-0.2 rounded-full">지기</span>
                                )}
                              </span>
                              <span>{rep.createdAt}</span>
                            </div>
                            <p className="text-slate-600 text-xs leading-relaxed font-semibold">{rep.content}</p>
                          </div>
                        ))}
                      </div>

                      {/* Reply Submission Form */}
                      <form onSubmit={(e) => handleAddReply(e, post.id)} className="pt-2 max-w-2xl space-y-3">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            id={`reply-author-input-${post.id}`}
                            type="text"
                            value={replyAuthor}
                            onChange={e => setReplyAuthor(e.target.value)}
                            placeholder="닉네임 (가명가능)"
                            className="p-2 border border-slate-200 rounded-lg text-xs w-full sm:w-44 bg-slate-50"
                          />
                          <div className="flex-1 flex gap-2">
                            <input
                              id={`reply-content-input-${post.id}`}
                              type="text"
                              value={replyContent}
                              onChange={e => setReplyContent(e.target.value)}
                              placeholder="건전하고 위로가 되는 댓글 및 답변을 작성해 주세요."
                              className="p-2 border border-slate-200 rounded-lg text-xs flex-1 bg-slate-50"
                            />
                            <button
                              id={`reply-submit-btn-${post.id}`}
                              type="submit"
                              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-lg flex items-center gap-1 shrink-0 cursor-pointer"
                            >
                              <Send className="w-3 h-3" />
                              <span>게재</span>
                            </button>
                          </div>
                        </div>
                      </form>

                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
