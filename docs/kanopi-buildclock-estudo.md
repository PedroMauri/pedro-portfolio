# BuildClock — Estudo completo (intake real)

> **Nota (Kanopi):** as respostas enviáveis foram refeitas com **Yethos** como âncora — ver [`kanopi-application-responses.md`](kanopi-application-responses.md) e pasta `kanopi-yethos-images/`. Este arquivo permanece como arquivo do BuildClock.

Fonte: respostas do Pedro (ago 2026).  
Âncora original deste intake: BuildClock (shipped).

---

## 0) Contexto

| Item | Detalhe |
|------|---------|
| Papel | Product Designer / UI / UX; também vendas, reuniões com clientes e prospecção |
| Equity | 50% Pedro / 50% Roger |
| Time | Roger (FE, co-founder), Ramon (FE), Rodrigo (Brand), Felipe (BE) |
| Timeline | Início nov 2023 → MVP live feb 2026 → Launch jun 2026 |
| Early customers | Mattali Drywall (~45), Lebron Construction (~15), Cullum (~260) |
| Mercado | Inglês, foco Canadá; sem App Store / Play Store (acesso via link de convite, mobile web) |

**Problema (definição do Pedro):** apps de clock-in no mercado (~US$7/usuário) costumam ser suites com features demais. Em conversas com construção (3 portes), a demanda era ferramenta **focada em clock in/out**, mais barata, com invite/jobsite **mobile-friendly**, hierarquia **worker / supervisor / admin**, worker **sem ver banco de horas** (subcontratados esporádicos), e **Reports** para montar invoice por jobsite/área/trabalhador.

**Antes:** small = WhatsApp/mensagens; mid = app ~3× o preço do BuildClock; larger = suite cara/complexa (docs, inventário, tasks, etc.).

**MVP:** empresas cobaias grátis; feedback de UI; fast clock-in após dado de que ~87% dos punches eram no mesmo jobsite/área do dia anterior.

---

## 1) Discovery

### Goals
- Entender dores reais (pesquisa contínua, não fase formal).
- Antes de desenhar: clareza do **objetivo de cada fluxo**.

### Atividades
- 1:1 + **muitas visitas a obras**; observou clock-in real.
- Stakeholders: donos (2 empresas menores), Project Manager (Cullum).
- Volume: dezenas de conversas nas menores; ~3 com a maior.
- Foco recorrente: fechamento **biweekly** — como é o dia e o que ajudaria.
- Competitive: **Vericlock** (simples p/ worker, mobile web, mais caro + HR), **Connecteam** (melhor UX admin, pesado p/ worker, só app), **ExakTime** (ok ambos, UI antiga, pouco valor pelo preço).

### Achados que mudaram o produto
- Fast clock-in; Reports para invoice; 3 roles; web mobile-friendly sem app.
- Pedido unânime: worker **sem** acesso às horas.
- Supervisor nasceu na Discovery.
- Errado depois: rate obrigatório por worker (admins querem opcional / por jobsite|área); Finance robusto (usam apps fiscais externos) → MVP mostrou que bastava Reports.
- Reports na Discovery era Finance grande; MVP cortou para Reports.

### Deliverables
- Quase nada formal; alguns lo-fi wires depois. Sem arquivos de notas/FigJam de research.
- “Fechou” Discovery ao consolidar lo-fi e ter certeza do objetivo dos fluxos.

### Validação → próxima fase
- MVP inegociável: **punches + planilha de horas** (deal-breaker para o admin).
- Validado no MVP: setting **max hours** (vermelho na planilha); **rounding** off/5/15/30.

### Imagens Discovery
- Nenhuma. Na resposta Kanopi: descrever método + usar wires/screens de fases seguintes / Yethos para “process artifacts”.

---

## 2) Content Strategy

*(Sem fase formal — conteúdo = hierarquia do que cada role vê/faz, naming e microcopy.)*

### Goals / approach
- Priorizar botões/features **mais usadas**.
- Naming: glossário com referência a apps + feedback de uso.

### Must-see por role
| Role | Vê / faz | Não vê |
|------|----------|--------|
| **Worker** | Clock in/out; buscar local de trabalho | Banco de horas; outros jobsites; outros workers |
| **Supervisor** | Punches do dia no site onde está alocado; reports limitados; settings limitados | Planilha/reports/settings completos de admin |
| **Admin** | Planilha com filtros (jobsite/area/worker) — essencial; Reports secundário | — |

### Invite
- Só **nome** obrigatório; resto opcional (velocidade).

### Microcopy / estados
- Textos: Pedro.
- Rounded: sucesso mostrar **real + rounded** (real no hover). Evolução: só real → só rounded → ambos.
- Fora do geofence ou edição → aprovação; app explica o motivo.
- Max hours: vermelho na planilha (**não** vai para review).
- Status: pending, declined, approved, **auto-approved** (clock in/out correto sem edição).
- MVP: admin não sabia o que já tinha aprovado → **auto-approved**.

### Reports (conteúdo da feature)
- Escolhas: período, jobsite, area (opcional); rate por area / jobsite / worker; esconder rate/horas/nomes; ou valor flat.
- Cortado do Finance antigo: status enviado/pago e punch “sumindo” de outros reports (confundia).

### Deliverables / imagens
- Nada formal de inventory; telas + conversas.
- Decisão content→UX: **velocidade** no invite e criar jobsite.

---

## 3) UX Strategy

### Estrutura
- Áreas separadas; botões de nav **invisíveis** por role.
- Fluxos: invite, criar jobsite, clock-in, review, timesheet, report (todos desenhados).
- Mais difícil: **criar jobsite + convidar worker** → **Quick Actions** na homepage do admin.
- Processo: hi-fi direto / contínuo (pouco lo-fi formal). Para Kanopi, **Yethos** cobre lo-fi/IA/research visuals.

### Decisões
| Decisão | Detalhe |
|---------|---------|
| Mobile web sem store | Acesso por convite; workers muitas vezes sem App Store na obra *(confirmar se cogitou nativo — não respondido)* |
| Worker só clock-in/out | Uma página; review = “em análise”; approved = notificação e some |
| Supervisor | Sem páginas punches/reports/settings de admin |
| Geofence | Worker vê localização no topo; sem local correto não clock-in; admin define GPS + endereço + raio no jobsite |
| Fast clock-in | Página “vazia” (location + CTA grande) → segundo botão menor; dado 87% |
| Rounding UI | Testes → real no hover |
| Status column | Última coluna da planilha |

### Escopo
- MVP: GPS, 3 roles, reviews (+ punches/planilha).
- Fora: pagamento cliente→app.
- Removido/simplificado: **Finance** → Reports.

### Validação
- Código + conversas + observação em obras.
- Mudanças pós-uso: Finance out; max hours warning; fast clock-in; auto-approved; rounded UI.

### Artefatos
- Produto live; UI “bonita” depois que UX estava resolvida.

---

## 4) Visual Design

| Item | Detalhe |
|------|---------|
| Brand | Rodrigo: logo e cores |
| UI / DS | Pedro: design system (tokens/components) |
| Princípio | Mobile-first **também para admin** |
| Worker | Hierarquia por tamanho de botão e ordem top→bottom |
| Quick Actions | Ícones pequenos, pouco espaço |
| Timesheet | Só essenciais (ex.: tirar rate da view) |
| Reports | Mesma UI do app + export PDF |
| Status visuais | pending, declined, approved, auto-approved |
| A11y | Prioridade nos **workers** (~400 users / 3 clientes MVP): tap targets, contraste |
| Dark mode | On por padrão |
| Handoff | Direto no código (Pedro também web dev) |
| Live vs early | Mudou distribuição de botões e forma de acessar páginas |
| Taste shot | Admin dashboard com vários workers on **ou** página de review |
| Screens | Pode capturar qualquer web/mobile |
| Apoio Kanopi | Yethos lo-fi → hi-fi + research artifacts: **sim** |

---

## 5) Histórias

### A) Research mudou recomendação — Finance → Reports
- **Inicial:** Finance robusto (report “consome” punch; status enviado/pago; punches únicos por report).
- **Evidência:** MVP com cobaias — complexidade; clientes já usam apps fiscais externos; necessidade real = gerar report/invoice simples.
- **Mudança:** removeu Finance; ficou Reports (período/jobsite/area, rates flex, hide fields, flat).
- **Aprendizado:** não assumir uso perfeito do admin; menos estado escondido > suite financeira.

### B) Defendeu com stakeholder — Roger (co-founder)
- Roger investiu em sistema onde cada punch era único/utilizável no report e **sumia** se usado num report.
- Pedro: não depender de uso perfeito; punch não deveria “desaparecer” de outros reports.
- Tensão: Roger apegado ao tempo investido na feature.
- **Resultado:** tiraram a abordagem; simplificaram para Reports.

### Outras evidências úteis (se precisar enxugar)
- Rate obrigatório → opcional.
- Fast clock-in (87%).
- Auto-approved (clareza na planilha).
- Rounded: real + rounded (hover).

---

## 6) Impacto (para Kanopi)

- **Fit imediato:** fluxos complexos com múltiplos papéis; UI densa (timesheet); mobile-first e a11y para usuários de campo; pesquisa em contexto real; partnership com eng; cortar escopo com evidência.
- **Balance:** meta negócio (preço, invoice) × jobs do usuário × a11y worker × constraints (sem store, GPS).
- **Outcome:** produto live (feb MVP → jun launch); 3 empresas / ~400 workers no MVP; punches+planilha como core; Quick Actions; Reports enxuto.

---

## 7) Self-assessment sugerido (confirmar)

| Skill | Score | Exemplo curto |
|-------|-------|----------------|
| Facilitating meetings / presenting | **4** | Clientes BuildClock + Upsigns; vendas/prospecção |
| Figma | **3–4** | DS/UI; BuildClock foi muito direto a código — não forçar 5 |
| Interaction design & prototyping | **4** | Roles, geofence/review, fast clock-in, Quick Actions |
| User research & usability | **4** | Obras, observação, competitive, MVP cobaias |
| Content strategy & IA | **3** | Hierarquia por role / naming; não content CMS de site |
| Accessible design / WCAG | **3** | Tap/contraste workers; sem auditoria WCAG formal |
| Managing multiple projects | **4** | Upsigns + BuildClock + outras roles |
| Collaborating cross-functional | **4** | Roger/devs/Rodrigo brand; clientes |

---

## 8) Checklist de imagens (anexar no email)

**BuildClock (obrigatório):**
1. Worker clock-in (+ fast clock-in)
2. Admin homepage + Quick Actions
3. Timesheet (status column; vermelho max hours se possível)
4. Review **ou** dashboard com workers online (taste)
5. Opcional: create jobsite (GPS/raio); invite; report/PDF

**Yethos (apoio processo — Discovery/UX artifacts):**
6. information-architecture.png
7. user-flow.png
8. wireframe-homepage.png
9. hifi-channels.png ou hifi-web.png

Legenda sugerida: *“Process artifacts from a prior end-to-end product redesign (Yethos), included because BuildClock moved quickly from field research into hi-fi/code.”*
