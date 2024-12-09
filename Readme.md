# 뺴박 (Bbaebak) API 서버

## 프로젝트 소개

뺴박은 약속 관리를 위한 REST API 서버입니다.
NestJS 프레임워크를 기반으로 구축되었으며,
TypeORM을 사용하여 MySQL 데이터베이스와 연동됩니다.

## 주요 기능

- 약속 생성 및 관리
- 약속 참여자 관리
- 약속 상태 관리 (초안/서명/완료)
- 메이커와 참여자의 서명 기능

## 기술 스택

- NestJS
- TypeScript
- TypeORM
- MySQL
- Class Validator

## 시작하기

### 환경 설정

다음 환경 변수를 `.env` 파일에 설정해야 합니다:

DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
PORT=3065

### 설치 및 실행

패키지 설치
`npm install`
개발 서버 실행
`npm run start:dev`
프로덕션 빌드
`npm run build`
프로덕션 실행
`npm run start:prod`

## API 엔드포인트

### 약속 관리

- `POST /api/v1/bbaebak` - 새로운 약속 초기화
- `GET /api/v1/bbaebak` - 약속 목록 조회
- `GET /api/v1/bbaebak/:id` - 특정 약속 조회
- `PATCH /api/v1/bbaebak/:id` - 약속 정보 업데이트
- `DELETE /api/v1/bbaebak/:id` - 약속 삭제

### 서명 관리

- `PATCH /api/v1/bbaebak/:id/sign` - 메이커 서명
- `PATCH /api/v1/bbaebak/:id/sign/:mateId` - 참여자 서명

## 프로젝트 구조
