"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const SERVICE_OPTIONS = [
  "피트니스센터 경영 컨설팅",
  "FC 양성 과정",
  "세미나 (FC DEEP SIGHT / PRO FC)",
  "관리자 집중 양성 과정",
  "기업·대학 강의 출강",
  "기타",
];

export function ContactForm({ endpoint, kakaoUrl }: { endpoint: string; kakaoUrl: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    // 스팸 봇용 숨김 필드가 채워져 있으면 조용히 무시
    if (data.get("_gotcha")) return;

    if (!endpoint) {
      setStatus("error");
      setError("폼 전송 주소가 아직 설정되지 않았습니다. 카카오톡 채널로 문의해 주세요.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError("전송에 실패했습니다. 잠시 후 다시 시도하거나 카카오톡 채널로 문의해 주세요.");
      console.error(err);
    }
  }

  if (status === "sent") {
    return (
      <div className="form-success" role="status">
        <h2>상담 신청이 접수되었습니다</h2>
        <p>남겨주신 연락처로 확인 후 연락드리겠습니다. 보통 영업일 기준 1~2일 안에 답변드립니다.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate={false}>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />
      <input type="hidden" name="_subject" value="[MOONFC 홈페이지] 상담 신청" />

      <div className="form-row">
        <label htmlFor="name">이름 <span className="req">*</span></label>
        <input id="name" name="name" type="text" required autoComplete="name" />
      </div>

      <div className="form-row">
        <label htmlFor="phone">연락처 <span className="req">*</span></label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="010-0000-0000" />
      </div>

      <div className="form-row">
        <label htmlFor="email">이메일</label>
        <input id="email" name="email" type="email" autoComplete="email" />
      </div>

      <div className="form-row">
        <label htmlFor="org">센터명 / 소속</label>
        <input id="org" name="org" type="text" autoComplete="organization" placeholder="예: OO휘트니스 강남점, OO대학교" />
      </div>

      <div className="form-row">
        <label htmlFor="region">지역</label>
        <input id="region" name="region" type="text" placeholder="예: 서울 강남구" />
      </div>

      <div className="form-row">
        <label htmlFor="service">관심 서비스 <span className="req">*</span></label>
        <select id="service" name="service" required defaultValue="">
          <option value="" disabled>
            선택해 주세요
          </option>
          {SERVICE_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label htmlFor="message">문의 내용 <span className="req">*</span></label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="센터 규모(회원 수, 직원 수), 현재 가장 큰 고민, 희망 일정 등을 적어 주시면 더 정확하게 안내드릴 수 있습니다."
        />
      </div>

      <div className="form-row form-check">
        <input id="agree" name="agree" type="checkbox" required value="동의" />
        <label htmlFor="agree">
          상담 목적의 개인정보(이름, 연락처, 이메일) 수집·이용에 동의합니다. 수집한 정보는 상담 외 목적으로 사용하지 않으며 상담 종료 후 파기합니다. <span className="req">*</span>
        </label>
      </div>

      {status === "error" && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? "전송 중…" : "상담 신청 보내기"}
        </button>
        {kakaoUrl && (
          <a href={kakaoUrl} className="btn btn-kakao" target="_blank" rel="noopener noreferrer">
            카카오톡 채널로 문의
          </a>
        )}
      </div>
    </form>
  );
}
