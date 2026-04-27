# ADR 001: 물리 엔진 선택 (Physics Engine Selection)

## 상태 (Status)
결정됨 (Accepted)

## 배경 (Context)
Pixel-Dash 게임의 핵심 메커니즘인 점프, 중력 적용 및 장애물 충돌 감지를 구현하기 위해 적절한 물리 엔진이 필요합니다.

## 결정 (Decision)
우리는 **Phaser.js Arcade Physics**를 사용하기로 결정했습니다.

## 이유 (Consequences)
1. **경량화**: Matter.js와 같은 복잡한 엔진에 비해 계산 리소스 소모가 적어 웹 브라우저에서 매우 부드럽게 작동합니다.
2. **테스트 용이성**: 속도(Velocity)와 가속도(Acceleration) 모델이 직관적이어서, Harness Engineering에서 요구하는 단위 테스트(Unit Testing)를 수행하기에 최적입니다.
3. **성능**: 단순한 2D 픽셀 아트 게임에서 다수의 객체를 처리할 때 높은 프레임워크 성능을 보장합니다.
4. **학습 곡선**: API가 단순하여 빠르게 프로토타입을 제작하고 검증할 수 있습니다.