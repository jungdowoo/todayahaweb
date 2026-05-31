import { writeFileSync } from "node:fs";

const categoryPlan = [
  {
    category: "생활",
    count: 70,
    topics: [
      ["제로콜라 같은 제로 음료에도 벌레가 꼬일까?", "zero-drink-fruit-flies", "제로 음료의 향, 산도, 컵 주변 잔여물이 벌레를 부를 수 있다는 점"],
      ["선풍기를 틀고 자면 정말 위험할까?", "sleeping-with-fan-risk", "밀폐, 체온 저하, 건조함 같은 조건을 나누어 보는 점"],
      ["휴대폰 충전기를 계속 꽂아 두면 전기요금이 많이 나올까?", "phone-charger-standby-power", "대기전력은 작지만 완전히 0은 아니라는 점"],
      ["전자레인지에 금속 그릇을 넣으면 왜 위험할까?", "metal-in-microwave-risk", "금속 모양과 전기장이 스파크를 만들 수 있다는 점"],
      ["컵라면 용기를 전자레인지에 돌려도 될까?", "cup-noodle-container-microwave", "용기 재질과 전자레인지 가능 표시를 확인해야 한다는 점"],
      ["물티슈를 변기에 버리면 정말 막힐까?", "wet-wipes-toilet-clog", "물에 잘 풀리지 않는 섬유가 배관에 쌓인다는 점"],
      ["유통기한이 지난 음식은 무조건 버려야 할까?", "expired-food-always-throw-away", "유통기한과 소비기한의 차이를 이해해야 한다는 점"],
      ["소비기한과 유통기한은 무엇이 다를까?", "use-by-date-vs-sell-by-date", "판매 가능 기간과 섭취 가능 기간의 차이"],
      ["냉장고 문을 자주 열면 전기요금이 오를까?", "fridge-door-electric-bill", "찬 공기 손실과 압축기 작동 시간이 늘어나는 점"],
      ["뜨거운 음식은 냉장고에 바로 넣어도 될까?", "hot-food-in-fridge", "온도 상승과 주변 음식 안전을 함께 봐야 한다는 점"],
      ["빨래를 밤에 말리면 냄새가 더 잘 날까?", "laundry-drying-at-night-smell", "습도와 건조 시간이 냄새에 영향을 주는 점"],
      ["비 오는 날 빨래가 잘 안 마르는 이유는 뭘까?", "rainy-day-laundry-drying", "공기 중 습도가 높으면 증발이 느려지는 점"],
      ["젖은 수건을 방치하면 왜 냄새가 날까?", "wet-towel-smell", "수분과 피부 잔여물이 미생물 증식을 돕는 점"],
      ["새 신발 냄새는 왜 생길까?", "new-shoe-smell", "접착제와 소재에서 나는 휘발성 냄새"],
      ["옷장 냄새를 없애려면 환기가 중요한 이유는?", "closet-smell-ventilation", "갇힌 습기와 냄새 성분을 빼내는 점"],
      ["겨울에 창문에 물방울이 맺히는 이유는?", "winter-window-condensation", "따뜻한 실내 공기가 차가운 유리에 닿아 응결하는 점"],
      ["화장실 거울은 왜 샤워 후 뿌옇게 될까?", "bathroom-mirror-fog", "수증기가 차가운 표면에 작은 물방울로 붙는 점"],
      ["얼룩은 오래될수록 왜 지우기 어려울까?", "old-stain-hard-to-remove", "섬유 속으로 스며들고 산화되는 과정"],
      ["커피 얼룩은 뜨거운 물로 지우는 게 좋을까?", "coffee-stain-hot-water", "얼룩 종류에 따라 물 온도가 달라져야 한다는 점"],
      ["치약은 많이 짤수록 양치가 더 잘 될까?", "more-toothpaste-better-brushing", "세정력보다 칫솔질 시간과 방법이 더 중요한 점"],
      ["칫솔은 얼마나 자주 바꾸는 게 좋을까?", "toothbrush-replacement-cycle", "칫솔모 마모와 위생 상태를 보는 점"],
      ["수건은 며칠마다 빨아야 할까?", "towel-washing-cycle", "사용 후 건조와 세균 번식 가능성을 고려하는 점"],
      ["베개 커버를 자주 안 빨면 어떻게 될까?", "pillowcase-washing-reason", "피지, 땀, 각질이 쌓이는 점"],
      ["스마트폰 화면은 생각보다 더러울까?", "smartphone-screen-germs", "손과 책상 접촉으로 오염이 쉽게 옮는 점"],
      ["캔 음료 입구를 닦고 마시는 게 좋을까?", "wipe-can-top-before-drinking", "유통과 보관 중 묻을 수 있는 먼지와 이물질"],
      ["생수병을 차 안에 오래 두면 괜찮을까?", "water-bottle-in-hot-car", "고온 보관과 플라스틱 냄새, 위생 문제"],
      ["생수병을 여러 번 재사용해도 될까?", "reuse-plastic-water-bottle", "세척 어려움과 스크래치 속 오염 가능성"],
      ["플라스틱 용기는 모두 재활용될까?", "all-plastic-recyclable", "재질, 오염, 지역 처리 기준에 따라 달라지는 점"],
      ["종이컵은 정말 종이만으로 만들었을까?", "paper-cup-coating", "방수 코팅 때문에 재활용이 복잡해지는 점"],
      ["배달 용기는 씻어서 버려야 할까?", "wash-delivery-container-recycling", "음식물 오염이 재활용 품질을 떨어뜨리는 점"],
      ["음식물 쓰레기와 일반 쓰레기는 왜 나눌까?", "food-waste-separation-reason", "처리 방식과 사료·퇴비 가능 여부"],
      ["에어컨 필터를 안 청소하면 어떻게 될까?", "aircon-filter-cleaning", "먼지 축적이 냉방 효율과 공기 질에 영향을 주는 점"],
      ["에어컨을 껐다 켰다 하면 전기요금이 더 나올까?", "aircon-on-off-electricity", "짧은 외출과 장시간 외출을 구분해야 하는 점"],
      ["보일러를 계속 켜두는 게 나을까, 껐다 켜는 게 나을까?", "boiler-keep-on-or-off", "단열 상태와 외출 시간에 따라 달라지는 점"],
      ["겨울에 이불 밖이 더 춥게 느껴지는 이유는?", "why-outside-blanket-feels-cold", "이불 안에 생긴 따뜻한 공기층"],
      ["손난로는 어떻게 따뜻해질까?", "how-hand-warmer-works", "산화 반응이나 과포화 용액 결정화로 열이 나는 점"],
      ["핫팩을 흔들면 더 따뜻해질까?", "shake-hot-pack", "산소 공급과 내용물 섞임의 영향"],
      ["우산은 왜 오래 쓰면 물이 스며들까?", "umbrella-waterproof-wears-off", "발수 코팅이 마찰과 오염으로 약해지는 점"],
      ["새 우산은 쓰기 전에 펴 두는 게 좋을까?", "new-umbrella-first-use", "접힌 자국과 방수 코팅 상태를 점검하는 점"],
      ["검은 우산이 햇빛을 더 잘 막을까?", "black-umbrella-sun-protection", "빛 흡수와 차광 효과의 차이"],
      ["흰 옷은 왜 누렇게 변할까?", "white-clothes-yellowing", "땀, 피지, 세제 잔여물의 산화"],
      ["운동화는 세탁기에 돌려도 될까?", "sneakers-in-washing-machine", "소재, 접착제, 형태 변형 위험"],
      ["고무장갑은 왜 냄새가 날까?", "rubber-glove-smell", "습기와 세제 잔여물이 안쪽에 남는 점"],
      ["설거지 스펀지는 깨끗해 보여도 괜찮을까?", "dish-sponge-germs", "젖은 스펀지가 미생물 번식에 유리한 점"],
      ["냉장고 냄새는 왜 서로 옮을까?", "fridge-smell-transfer", "휘발성 냄새 성분이 밀폐 공간에 퍼지는 점"],
      ["김치 냄새는 플라스틱 용기에 왜 배일까?", "kimchi-smell-plastic-container", "플라스틱 표면과 냄새 성분의 흡착"],
      ["방향제는 냄새를 없애는 걸까, 덮는 걸까?", "air-freshener-remove-or-mask", "냄새 원인 제거와 향으로 가리는 방식의 차이"],
      ["향수 냄새는 사람마다 다르게 느껴질까?", "perfume-smells-different", "피부 온도와 후각 민감도 차이"],
      ["엘리베이터에는 왜 거울이 있을까?", "why-elevators-have-mirrors", "공간감, 안전 확인, 대기 체감 완화"],
      ["지하철 손잡이는 얼마나 자주 오염될까?", "subway-handle-cleanliness", "많은 손이 닿는 공용 표면의 특성"],
      ["비누는 세균을 죽이는 걸까, 씻어내는 걸까?", "soap-kill-or-remove-germs", "일반 비누의 주된 역할은 떼어내 헹구는 것"],
      ["먼지를 창문 열고 털면 깨끗해질까?", "dusting-with-window-open", "먼지가 다시 가라앉거나 밖으로 나갈 수 있는 조건"],
      ["목욕 후 손가락이 쭈글쭈글해지는 이유는?", "wrinkled-fingers-after-bath", "물 흡수와 신경 반응이 함께 작용하는 점"],
      ["머리는 매일 감아야 할까?", "wash-hair-every-day", "두피 상태와 활동량에 따라 달라지는 점"],
      ["샴푸 거품이 많으면 더 잘 씻길까?", "more-shampoo-foam-cleaner", "거품 양과 세정력은 완전히 같지 않다는 점"],
      ["린스와 트리트먼트는 무엇이 다를까?", "rinse-vs-treatment", "머리카락 표면 정리와 손상 보완의 차이"],
      ["마스크는 냄새를 완전히 막을까?", "mask-block-smell", "냄새 분자와 필터 성능의 차이"],
      ["안경은 왜 김이 서릴까?", "glasses-fogging-reason", "따뜻한 숨의 수증기가 차가운 렌즈에 응결하는 점"],
      ["차 유리는 왜 김이 서릴 때 에어컨을 켤까?", "car-window-fog-aircon", "공기 중 습기를 낮춰 응결을 줄이는 점"],
      ["껌을 삼키면 몸속에 오래 남을까?", "swallowed-gum-stays", "소화되지는 않지만 대부분 배출된다는 점"],
      ["손톱은 왜 계속 자랄까?", "why-nails-keep-growing", "손톱 뿌리의 세포 분열"],
      ["머리카락은 왜 빠질까?", "why-hair-falls-out", "성장 주기와 생활 상태가 영향을 주는 점"],
      ["잠을 많이 자도 피곤한 이유는 뭘까?", "tired-after-long-sleep", "수면 시간보다 수면 질과 리듬이 중요하다는 점"],
      ["하품은 왜 전염되는 것처럼 느껴질까?", "why-yawning-feels-contagious", "주의와 공감 반응이 함께 작용할 수 있다는 점"],
      ["손발은 왜 차가워질까?", "cold-hands-feet-reason", "말초 혈류와 체온 조절"],
      ["매운 것을 먹으면 왜 땀이 날까?", "spicy-food-sweating", "캡사이신이 열감 수용체를 자극하는 점"],
      ["매운 음식을 먹으면 왜 콧물이 날까?", "spicy-food-runny-nose", "점막 자극과 분비물 증가"],
      ["딸꾹질은 왜 생길까?", "why-hiccups-happen", "횡격막의 갑작스러운 수축"],
      ["자면서 침을 흘리는 이유는 뭘까?", "drooling-while-sleeping", "수면 자세와 삼킴 반응 감소"],
      ["오래 앉아 있으면 다리가 저린 이유는?", "legs-numb-after-sitting", "압박으로 혈류와 신경 신호가 영향을 받는 점"],
    ],
  },
  {
    category: "음식",
    count: 45,
    topics: [
      ["바나나는 냉장고에 넣으면 더 빨리 상할까?", "banana-refrigerator-storage", "낮은 온도에서 껍질이 갈변하지만 속 상태는 따로 봐야 한다는 점"],
      ["사과를 깎아 두면 왜 갈색으로 변할까?", "apple-browning-reason", "효소와 산소가 만나 갈변 반응이 일어나는 점"],
      ["감자에 싹이 나면 먹어도 될까?", "sprouted-potato-safe", "싹과 초록 부분의 독성 성분을 조심해야 한다는 점"],
      ["달걀이 물에 뜨면 상한 걸까?", "egg-float-test", "오래될수록 공기주머니가 커져 뜰 수 있다는 점"],
      ["우유는 개봉 후 빨리 마셔야 할까?", "opened-milk-storage", "개봉 후 미생물 접촉이 늘어나는 점"],
      ["생마늘은 냉장 보관이 좋을까?", "raw-garlic-storage", "습도와 곰팡이, 싹 틈을 고려해야 하는 점"],
      ["김은 왜 금방 눅눅해질까?", "seaweed-gets-soggy", "수분을 잘 흡수하는 얇은 구조"],
      ["과자는 봉지를 열어두면 왜 눅눅해질까?", "snacks-get-soggy", "공기 중 수분이 바삭한 구조에 들어가는 점"],
      ["라면 물은 왜 정해진 양을 넣을까?", "ramen-water-amount", "면 익힘과 스프 농도를 함께 맞추는 점"],
      ["라면을 먹으면 왜 갈증이 날까?", "ramen-thirst-reason", "나트륨 섭취가 갈증을 유발할 수 있다는 점"],
      ["탄산음료를 흔들면 왜 거품이 많이 날까?", "shaken-soda-foam", "녹아 있던 이산화탄소가 빠르게 빠져나오는 점"],
      ["콜라는 치아에 정말 안 좋을까?", "cola-teeth-acid", "산성과 당분이 치아 건강에 영향을 줄 수 있다는 점"],
      ["얼음이 든 음료는 왜 맛이 연해질까?", "ice-dilutes-drink", "녹은 물이 농도를 낮추는 점"],
      ["아이스크림을 녹였다 다시 얼리면 맛이 달라질까?", "refrozen-ice-cream-texture", "얼음 결정이 커져 식감이 거칠어지는 점"],
      ["냉동식품은 해동했다가 다시 얼려도 될까?", "refreeze-thawed-food", "온도 관리와 미생물 증식 위험을 고려해야 하는 점"],
      ["고기를 구우면 왜 갈색으로 변할까?", "meat-browning-maillard", "마이야르 반응이 색과 향을 만드는 점"],
      ["고기를 자르면 왜 육즙이 나올까?", "meat-juice-reason", "근육 속 수분과 단백질이 흘러나오는 점"],
      ["삼겹살을 구울 때 연기가 많이 나는 이유는?", "pork-belly-smoke", "지방이 뜨거운 표면에 떨어져 연기가 나는 점"],
      ["튀김은 시간이 지나면 왜 눅눅해질까?", "fried-food-soggy", "수분 이동이 바삭한 구조를 무너뜨리는 점"],
      ["치킨은 식으면 왜 맛이 달라질까?", "cold-fried-chicken-taste", "지방 굳음과 향 성분 변화"],
      ["피자를 데우면 처음 맛과 왜 다를까?", "reheated-pizza-taste", "빵, 치즈, 토핑의 수분과 지방 변화"],
      ["밥은 왜 냉장고에 넣으면 딱딱해질까?", "rice-hard-in-fridge", "전분 노화가 빠르게 일어나는 점"],
      ["밥을 냉동 보관하면 맛이 덜 변할까?", "freeze-cooked-rice", "전분 노화를 늦추는 보관 방식"],
      ["국을 오래 끓이면 기름이 뜰까?", "soup-oil-floating", "지방이 물보다 밀도가 낮아 위로 모이는 점"],
      ["카레는 다음 날 더 맛있게 느껴질까?", "curry-next-day-taste", "향신료와 재료 맛이 섞이고 안정되는 점"],
      ["김치는 왜 익으면 시어질까?", "kimchi-sour-fermentation", "젖산 발효로 산이 늘어나는 점"],
      ["요구르트는 왜 새콤할까?", "yogurt-sour-taste", "유산균이 만든 산미"],
      ["치즈는 왜 늘어날까?", "why-cheese-stretches", "단백질과 지방 구조가 열에 반응하는 점"],
      ["버터와 마가린은 무엇이 다를까?", "butter-vs-margarine", "원료와 지방 조성이 다른 점"],
      ["설탕과 올리고당은 뭐가 다를까?", "sugar-vs-oligosaccharide", "단맛, 분자 구조, 소화 특성이 다른 점"],
      ["꿀은 왜 오래 두어도 잘 상하지 않을까?", "honey-long-shelf-life", "낮은 수분과 높은 당 농도"],
      ["소금은 왜 음식 보관에 유리할까?", "salt-food-preservation", "미생물이 이용할 물을 줄이는 점"],
      ["매운맛은 맛일까, 통증일까?", "spicy-taste-or-pain", "캡사이신이 통각 수용체를 자극하는 점"],
      ["민트는 왜 시원하게 느껴질까?", "mint-cool-feeling", "멘톨이 차가움 수용체를 자극하는 점"],
      ["초콜릿은 왜 입안에서 녹을까?", "chocolate-melts-in-mouth", "코코아버터의 녹는점이 체온 근처인 점"],
      ["커피를 마시면 왜 잠이 덜 올까?", "coffee-sleep-caffeine", "카페인이 졸림 신호를 가리는 점"],
      ["커피를 많이 마시면 손이 떨릴까?", "coffee-shaky-hands", "카페인 민감도와 섭취량의 영향"],
      ["디카페인 커피에는 카페인이 전혀 없을까?", "decaf-coffee-caffeine", "대부분 줄인 것이지 완전 0은 아닐 수 있다는 점"],
      ["탄산수는 물 대신 마셔도 될까?", "sparkling-water-instead-of-water", "당 없는 탄산수와 산미를 구분해야 하는 점"],
      ["물을 너무 많이 마셔도 문제가 될까?", "too-much-water-risk", "전해질 균형이 흐트러질 수 있다는 점"],
      ["아침밥은 꼭 먹어야 할까?", "must-eat-breakfast", "생활 리듬과 식사 구성에 따라 달라지는 점"],
      ["야식을 먹으면 왜 속이 불편할까?", "late-night-snack-discomfort", "소화 시간과 누운 자세의 영향"],
      ["배고프면 왜 예민해질까?", "hungry-and-irritable", "혈당, 호르몬, 스트레스 반응의 영향"],
      ["양파를 자르면 왜 눈물이 날까?", "onion-makes-tears", "휘발성 황화합물이 눈을 자극하는 점"],
      ["마늘 냄새는 왜 오래 남을까?", "garlic-smell-lingers", "황 성분이 몸과 입안에 오래 남을 수 있다는 점"],
    ],
  },
  {
    category: "과학",
    count: 35,
    topics: [
      ["하늘은 왜 파랗게 보일까?", "why-sky-is-blue", "짧은 파장의 빛이 대기에서 더 많이 산란되는 점"],
      ["노을은 왜 붉게 보일까?", "why-sunset-is-red", "빛이 대기를 길게 지나며 파란빛이 흩어지는 점"],
      ["바다는 왜 파랗게 보일까?", "why-sea-looks-blue", "빛의 흡수와 산란, 하늘 반사가 함께 작용하는 점"],
      ["번개와 천둥은 왜 시간 차이가 날까?", "lightning-thunder-time-gap", "빛과 소리의 속도 차이"],
      ["무지개는 왜 생길까?", "how-rainbow-forms", "물방울 속 굴절과 반사로 빛이 나뉘는 점"],
      ["얼음은 왜 물에 뜰까?", "why-ice-floats", "얼음의 밀도가 액체 물보다 낮은 점"],
      ["물이 얼면 왜 부피가 커질까?", "water-expands-when-freezing", "물 분자 배열에 빈 공간이 생기는 점"],
      ["렌즈는 왜 사물을 크게 보이게 할까?", "lens-magnification", "빛의 굴절로 초점과 상이 달라지는 점"],
      ["구름은 왜 하늘에 떠 있을까?", "why-clouds-float", "작은 물방울과 상승 기류가 함께 작용하는 점"],
      ["비는 어떻게 만들어질까?", "how-rain-forms", "구름 속 물방울이 커져 떨어지는 과정"],
      ["안개는 왜 생길까?", "why-fog-forms", "지표 근처 수증기가 작은 물방울로 응결하는 점"],
      ["이슬은 왜 아침에 생길까?", "why-dew-forms", "밤사이 차가워진 표면에 수증기가 응결하는 점"],
      ["소리는 왜 벽을 통과해서 들릴까?", "sound-through-wall", "진동이 공기와 구조물을 통해 전달되는 점"],
      ["우주에서는 소리가 들릴까?", "sound-in-space", "소리를 전달할 매질이 거의 없다는 점"],
      ["달 모양은 왜 매일 달라질까?", "moon-phases", "태양, 지구, 달의 위치 관계"],
      ["달은 스스로 빛을 낼까?", "does-moon-shine-itself", "태양빛을 반사해 보이는 점"],
      ["별은 왜 반짝이는 것처럼 보일까?", "why-stars-twinkle", "대기 흔들림이 별빛 경로를 바꾸는 점"],
      ["지구는 완벽한 공 모양일까?", "earth-perfect-sphere", "자전 때문에 적도 쪽이 조금 부푼 점"],
      ["낮과 밤은 왜 생길까?", "why-day-and-night", "지구 자전으로 태양을 향하는 면이 바뀌는 점"],
      ["계절은 왜 바뀔까?", "why-seasons-change", "지구 자전축 기울기와 공전의 영향"],
      ["중력은 왜 우리를 아래로 끌어당길까?", "why-gravity-pulls", "질량을 가진 물체 사이의 끌어당김"],
      ["높은 곳에서는 귀가 먹먹해지는 이유는?", "ear-pressure-high-place", "기압 차이가 고막에 영향을 주는 점"],
      ["비행기는 무거운데 어떻게 날까?", "how-airplane-flies", "날개 주변 공기 흐름과 양력"],
      ["배는 왜 물에 뜰까?", "why-ships-float", "부력과 평균 밀도의 관계"],
      ["풍선은 왜 하늘로 올라갈까?", "why-helium-balloon-rises", "주변 공기보다 낮은 밀도와 부력"],
      ["헬륨가스를 마시면 왜 목소리가 변할까?", "helium-voice-change", "소리의 속도와 공명 특성이 달라지는 점"],
      ["자석은 왜 철을 끌어당길까?", "magnet-attracts-iron", "철 내부 자기 영역이 정렬되는 점"],
      ["정전기는 왜 생길까?", "why-static-electricity", "마찰로 전하가 한쪽에 쌓이는 점"],
      ["겨울에 문손잡이를 잡으면 왜 찌릿할까?", "winter-static-shock", "건조한 공기에서 정전기가 잘 쌓이는 점"],
      ["전구는 왜 빛이 날까?", "why-light-bulb-glows", "전기 에너지가 빛과 열로 바뀌는 점"],
      ["그림자는 왜 생길까?", "why-shadows-form", "빛이 물체에 막혀 뒤쪽에 어두운 영역이 생기는 점"],
      ["거울은 왜 모습을 비출까?", "how-mirror-reflects", "매끄러운 표면에서 빛이 규칙적으로 반사되는 점"],
      ["돋보기는 왜 물체를 크게 보이게 할까?", "magnifying-glass-principle", "볼록렌즈가 빛을 모아 확대된 상을 만드는 점"],
      ["물속에서는 왜 소리가 다르게 들릴까?", "sound-underwater", "물과 공기에서 소리 전달 속도와 방식이 다른 점"],
      ["뜨거운 공기는 왜 위로 올라갈까?", "hot-air-rises", "따뜻한 공기의 밀도가 낮아지는 점"],
    ],
  },
  {
    category: "동물",
    count: 25,
    topics: [
      ["고양이는 왜 박스를 좋아할까?", "why-cats-like-boxes", "좁고 숨을 수 있는 공간이 안정감을 주는 점"],
      ["고양이는 왜 높은 곳에 올라갈까?", "why-cats-like-high-places", "주변을 살피고 안전하다고 느끼는 본능"],
      ["고양이는 왜 물을 싫어하는 경우가 많을까?", "why-cats-dislike-water", "털 젖음과 체온, 경험의 영향"],
      ["고양이는 왜 야옹 소리를 사람에게 많이 낼까?", "why-cats-meow-at-humans", "사람과 소통하기 위해 소리를 쓰는 점"],
      ["강아지는 왜 꼬리를 흔들까?", "why-dogs-wag-tails", "감정과 의사 표현이 꼬리 움직임에 드러나는 점"],
      ["강아지는 사람 얼굴을 알아볼까?", "can-dogs-recognize-faces", "냄새, 목소리, 표정을 함께 기억하는 점"],
      ["강아지는 왜 산책을 좋아할까?", "why-dogs-like-walks", "냄새 탐색과 활동 욕구를 채우는 점"],
      ["강아지는 자기 전에 왜 빙글빙글 돌까?", "why-dogs-circle-before-sleep", "자리 확인과 본능적 행동의 흔적"],
      ["새는 어떻게 하늘을 날까?", "how-birds-fly", "날개 모양과 근육, 공기 흐름이 만드는 양력"],
      ["비둘기는 왜 도시에서 많이 보일까?", "why-pigeons-thrive-in-cities", "건물 구조와 먹이 환경에 잘 적응한 점"],
      ["닭은 왜 오래 날지 못할까?", "why-chickens-cannot-fly-far", "몸 구조와 사육 품종의 특성"],
      ["타조는 왜 날지 못할까?", "why-ostriches-cannot-fly", "큰 몸과 달리기에 특화된 다리"],
      ["물고기는 물속에서 어떻게 숨을 쉴까?", "how-fish-breathe-underwater", "아가미로 물속 산소를 얻는 점"],
      ["금붕어 기억력은 정말 3초일까?", "goldfish-memory-myth", "금붕어도 학습과 기억을 할 수 있다는 점"],
      ["상어는 물고기일까?", "are-sharks-fish", "아가미와 지느러미를 가진 연골어류라는 점"],
      ["고래는 왜 물 밖으로 숨을 쉬러 올라올까?", "why-whales-surface-to-breathe", "고래는 폐로 숨 쉬는 포유류라는 점"],
      ["개미는 왜 줄지어 다닐까?", "why-ants-line-up", "페로몬 길을 따라 이동하는 점"],
      ["모기는 왜 사람 피를 빨까?", "why-mosquitoes-bite", "암컷 모기가 알을 만들 영양분을 얻는 점"],
      ["모기는 어떤 사람을 더 잘 물까?", "why-mosquitoes-prefer-some-people", "이산화탄소, 체취, 체온 등이 영향을 주는 점"],
      ["바퀴벌레는 왜 생명력이 강하다고 할까?", "why-cockroaches-survive-well", "잡식성, 번식력, 은신 능력이 뛰어난 점"],
      ["나비는 애벌레에서 어떻게 변할까?", "how-caterpillar-becomes-butterfly", "번데기 안에서 몸 구조가 크게 바뀌는 점"],
      ["거미는 왜 자기 거미줄에 잘 안 걸릴까?", "why-spiders-dont-stick", "다리 구조와 움직임, 끈적이지 않은 줄 이용"],
      ["꿀벌은 왜 꽃을 찾아다닐까?", "why-bees-visit-flowers", "꿀과 꽃가루를 얻고 식물 수분을 돕는 점"],
      ["문어는 정말 똑똑할까?", "are-octopuses-smart", "문제 해결과 학습 행동을 보이는 점"],
      ["카멜레온은 왜 색을 바꿀까?", "why-chameleons-change-color", "위장뿐 아니라 온도와 감정 신호도 관련되는 점"],
    ],
  },
  {
    category: "역사/문화",
    count: 25,
    topics: [
      ["세종대왕은 왜 한글을 만들었을까?", "why-king-sejong-created-hangul", "백성이 쉽게 읽고 쓸 수 있는 문자가 필요했던 점"],
      ["한글은 왜 과학적인 문자라고 불릴까?", "why-hangul-is-scientific", "발음 기관 모양과 소리 원리를 반영한 점"],
      ["조선 시대 사람들도 배달 음식을 먹었을까?", "delivery-food-in-joseon", "상업과 도시 문화 속에서 음식을 사 먹는 방식이 있었던 점"],
      ["조선 시대에도 얼음 간식이 있었을까?", "ice-dessert-in-joseon", "얼음 저장과 여름 음식 문화"],
      ["옛날 사람들은 시간을 어떻게 알았을까?", "how-people-told-time-in-past", "해시계, 물시계, 종소리 같은 도구"],
      ["조선 시대에도 화장품이 있었을까?", "cosmetics-in-joseon", "분과 연지 등 꾸밈 문화가 있었던 점"],
      ["옛날 사람들은 편지를 어떻게 보냈을까?", "how-letters-were-sent-in-past", "사람과 역참, 교통망을 활용한 점"],
      ["냉장고가 없던 시절 음식은 어떻게 보관했을까?", "food-storage-before-fridge", "건조, 염장, 발효, 저장고를 활용한 점"],
      ["옛날에는 밤에 어떻게 불을 밝혔을까?", "lighting-before-electricity", "촛불, 등잔, 기름 램프의 사용"],
      ["옛날에는 소금을 왜 귀하게 여겼을까?", "why-salt-was-valuable", "음식 보존과 맛, 생활 필수품으로 중요했던 점"],
      ["피라미드는 정말 노예가 만들었을까?", "pyramids-built-by-slaves", "노동 조직과 고대 사회에 대한 새로운 해석"],
      ["로마는 정말 하루아침에 무너졌을까?", "rome-did-not-fall-in-a-day", "정치, 경제, 군사 문제가 오랜 기간 겹친 점"],
      ["중세 사람들은 모두 지구가 평평하다고 믿었을까?", "medieval-flat-earth-myth", "당대 지식인 사이에는 둥근 지구 인식이 있었다는 점"],
      ["바이킹은 정말 뿔 달린 투구를 썼을까?", "viking-horned-helmet-myth", "후대 이미지와 실제 고고학 자료의 차이"],
      ["콜럼버스가 지구가 둥글다는 걸 처음 알렸을까?", "columbus-round-earth-myth", "이미 알려진 지식과 항해 목적의 차이"],
      ["종이는 왜 역사적으로 중요한 발명일까?", "why-paper-important-invention", "지식 기록과 전달 비용을 낮춘 점"],
      ["인쇄술은 왜 세상을 바꾸었을까?", "why-printing-changed-world", "책과 정보의 대량 확산"],
      ["올림픽은 어디에서 시작되었을까?", "origin-of-olympics", "고대 그리스의 제전과 경기 문화"],
      ["달력은 왜 만들어졌을까?", "why-calendar-created", "농사, 제사, 생활 계획을 맞추기 위한 시간 체계"],
      ["바퀴는 왜 중요한 발명일까?", "why-wheel-important", "운반과 이동의 효율을 크게 높인 점"],
      ["나침반은 항해에 왜 중요했을까?", "why-compass-important", "방향을 안정적으로 알 수 있게 한 점"],
      ["실크로드는 비단만 오가던 길이었을까?", "silk-road-not-only-silk", "상품뿐 아니라 문화와 기술도 오간 점"],
      ["고대 올림픽은 지금과 비슷했을까?", "ancient-vs-modern-olympics", "종목, 참가 방식, 의미가 달랐던 점"],
      ["옛날 사람들은 머리를 얼마나 자주 감았을까?", "hair-washing-in-the-past", "물 사용, 목욕 문화, 계층에 따라 달랐던 점"],
      ["옛날 사람들은 치통이 생기면 어떻게 했을까?", "toothache-treatment-in-past", "민간요법과 초기 치과 도구가 함께 쓰였던 점"],
    ],
  },
];

const easyMap = {
  생활: "쉬움",
  음식: "쉬움",
  과학: "보통",
  동물: "쉬움",
  "역사/문화": "보통",
};

function typeFor(index) {
  return index % 5 === 1 || index % 5 === 3 ? "MULTIPLE_CHOICE" : "OX";
}

function oxAnswer(index) {
  return index % 4 === 0 ? "X" : "O";
}

function seoDescription(title, focus) {
  return `${title} ${focus}을 중심으로 정답과 이유를 쉽게 풀어 설명합니다. 생활 속 예시와 흔한 오해까지 함께 확인해 보세요.`;
}

function detail(title, category, focus) {
  const categoryLine = {
    생활: "생활 속 현상은 눈앞에서 자주 보이기 때문에 단순한 경험담으로 결론을 내리기 쉽습니다.",
    음식: "음식과 보관 문제는 맛, 온도, 수분, 미생물 같은 요소가 함께 움직입니다.",
    과학: "과학 현상은 어렵게 느껴질 수 있지만 관찰되는 결과를 원인별로 나누면 훨씬 쉬워집니다.",
    동물: "동물 행동은 귀엽게 보이는 장면 뒤에 생존과 의사소통의 이유가 숨어 있는 경우가 많습니다.",
    "역사/문화": "역사와 문화 이야기는 지금의 기준만으로 보면 오해하기 쉽고 당시 환경을 함께 봐야 합니다.",
  }[category];

  return `${title}라는 질문은 많은 사람이 한 번쯤 검색하거나 주변 사람에게 물어볼 만한 주제입니다. 핵심은 ${focus}입니다. ${categoryLine} 그래서 정답을 외우기보다 어떤 조건에서 그런 일이 생기고, 어떤 경우에는 예외가 있는지 함께 보는 편이 좋습니다. 예를 들어 같은 상황처럼 보여도 온도, 습도, 재료, 시간, 사용 습관, 주변 환경이 달라지면 결과가 달라질 수 있습니다. 이 퀴즈의 목적은 겁을 주거나 과장된 결론을 내리는 것이 아니라, 일상에서 판단할 때 도움이 되는 기준을 제공하는 것입니다. 실제 생활에서는 먼저 표시 사항이나 기본 원리를 확인하고, 냄새가 나거나 색이 변하거나 평소와 다른 상태가 보이면 무리해서 사용하거나 먹지 않는 신중함이 필요합니다. 반대로 근거 없이 무조건 위험하다고 생각하면 불필요한 걱정이 커질 수 있습니다. 검색으로 이 주제를 찾아온 사람은 보통 바로 행동해도 되는지, 왜 그런 현상이 생기는지, 주변에 설명할 만한 쉬운 표현이 무엇인지 궁금해합니다. 따라서 답을 볼 때는 원인, 조건, 예외, 실생활 대처를 나누어 읽는 것이 좋습니다. 오늘의 아하 포인트는 현상을 한 가지 이유로만 보지 않고, 원인과 조건을 나누어 이해하는 데 있습니다.`;
}

function buildQuiz(topic, category, globalIndex) {
  const [title, slug, focus] = topic;
  const type = typeFor(globalIndex);
  const difficulty = globalIndex % 20 === 0 ? "어려움" : globalIndex % 3 === 0 ? "보통" : easyMap[category];
  const estimatedReadTime = globalIndex % 3 === 0 ? 3 : 2;

  if (type === "OX") {
    const answer = oxAnswer(globalIndex);
    const question =
      answer === "O"
        ? `${title.replace(/\?$/, "")}는 조건에 따라 실제로 그럴 수 있다.`
        : `${title.replace(/\?$/, "")}는 언제나 한 가지 이유만으로 설명된다.`;
    return {
      category,
      type,
      difficulty,
      estimatedReadTime,
      slug,
      seoTitle: title,
      seoDescription: seoDescription(title, focus),
      title,
      question,
      options: ["O", "X"],
      answer,
      shortAnswer: answer === "O" ? "조건에 따라 실제로 그럴 수 있습니다." : "항상 한 가지 이유만으로 설명되지는 않습니다.",
      easyExplanation:
        answer === "O"
          ? `${focus}을 알면 이유를 쉽게 이해할 수 있습니다. 다만 모든 상황이 똑같지는 않아서 조건을 함께 봐야 합니다.`
          : `${focus}이 중요하지만, 이 현상은 한 가지 이유로만 딱 잘라 말하기 어렵습니다. 조건에 따라 결과가 달라질 수 있습니다.`,
      detailExplanation: detail(title, category, focus),
      realLifeExample: `집이나 학교, 음식점, 대중교통처럼 익숙한 공간에서도 ${title.replace(/\?$/, "")}와 관련된 상황을 쉽게 볼 수 있습니다.`,
      commonMisunderstanding: "많은 사람이 한 가지 원인만 기억하고 모든 상황에 똑같이 적용하려 하지만, 실제로는 조건과 예외를 함께 봐야 합니다.",
      ahaSummary: `${focus}을 기억하면 이 질문의 핵심을 쉽게 이해할 수 있습니다.`,
      keywords: [title.replace(/[?]/g, ""), focus.split(" ")[0], category, "이유", "상식 퀴즈"].slice(0, 5),
      relatedQuizSlugs: [],
    };
  }

  const correct = "여러 조건이 함께 작용한다";
  return {
    category,
    type,
    difficulty,
    estimatedReadTime,
    slug,
    seoTitle: title,
    seoDescription: seoDescription(title, focus),
    title,
    question: title,
    options: ["항상 한 가지 원인만 있다", correct, "아무 영향이 없다", "무조건 위험하다고 보면 된다"],
    answer: correct,
    shortAnswer: `${focus}처럼 여러 조건을 함께 보면 이해하기 쉽습니다.`,
    easyExplanation: `이 문제의 핵심은 ${focus}입니다. 하나의 답만 외우기보다 상황과 조건을 함께 생각하면 더 정확하게 판단할 수 있습니다.`,
    detailExplanation: detail(title, category, focus),
    realLifeExample: `일상에서 ${title.replace(/\?$/, "")}와 비슷한 장면을 보면, 먼저 주변 조건과 사용 방법을 함께 확인하는 것이 좋습니다.`,
    commonMisunderstanding: "겉으로 보이는 결과만 보고 원인을 하나로 단정하면 오해가 생기기 쉽습니다.",
    ahaSummary: `${title.replace(/\?$/, "")}는 ${focus}을 중심으로 이해하면 됩니다.`,
    keywords: [title.replace(/[?]/g, ""), focus.split(" ")[0], category, "원인", "상식 퀴즈"].slice(0, 5),
    relatedQuizSlugs: [],
  };
}

const all = [];
let index = 0;
for (const group of categoryPlan) {
  if (group.topics.length !== group.count) {
    throw new Error(`${group.category} topic count mismatch: ${group.topics.length} !== ${group.count}`);
  }
  for (const topic of group.topics) {
    index += 1;
    all.push(buildQuiz(topic, group.category, index));
  }
}

const parts = [
  ["quiz-seed-part-1.json", all.slice(0, 70)],
  ["quiz-seed-part-2.json", all.slice(70, 120)],
  ["quiz-seed-part-3.json", all.slice(120, 170)],
  ["quiz-seed-part-4.json", all.slice(170, 200)],
];

for (const [file, data] of parts) {
  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

console.log(JSON.stringify({
  total: all.length,
  categories: all.reduce((acc, quiz) => {
    acc[quiz.category] = (acc[quiz.category] ?? 0) + 1;
    return acc;
  }, {}),
  type: all.reduce((acc, quiz) => {
    acc[quiz.type] = (acc[quiz.type] ?? 0) + 1;
    return acc;
  }, {}),
}, null, 2));
