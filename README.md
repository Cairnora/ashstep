# AKORA Company Website

아코라 유한회사의 정적 회사 홈페이지와 공고 게시판입니다.

## 구성

- `index.html`: 회사 소개 1페이지
- `notices/index.html`: 공고 목록
- `notices/<게시일>-<slug>/index.html`: 공고 원문
- `styles.css`: 공통 스타일
- `site.js`: 한국어/영어 전환

## 공고 추가

1. 기존 공고 상세 폴더를 복사해 새 게시일과 제목으로 수정합니다.
2. `notices/index.html`의 공고 목록 맨 위에 새 공고를 추가합니다.
3. `index.html`의 최근 공고 영역도 같은 내용으로 갱신합니다.
4. 게시 전 제목, 게시일, 본문, 첨부 파일, 링크를 확인합니다.

법정 공고는 한국어 원문을 기준으로 보관합니다.
