import { LitElement, html, css } from 'lit';

const goalData = [
  {
    name: 'No Poverty',
    color: '#e5243b',
    image: new URL('../lib/svgs/goal-1.svg', import.meta.url).href,
  },
  { name: 'Zero Hunger', color: '#dda63a' },
  { name: 'Good Health and Well-being', color: '#4c9f38' },
  { name: 'Quality Education', color: '#c5192d' },
  { name: 'Gender Equality', color: '#ff3a21' },
  { name: 'Clean Water and Sanitation', color: '#26bde2' },
  { name: 'Affordable and Clean Energy', color: '#fcc30b' },
  { name: 'Decent Work and Economic Growth', color: '#a21942' },
  { name: 'Industry, Innovation and Infrastructure', color: '#fd6925' },
  { name: 'Reduced Inequalities', color: '#dd1367' },
  { name: 'Sustainable Cities and Communities', color: '#fd9d24' },
  { name: 'Responsible Consumption and Production', color: '#bf8b2e' },
  { name: 'Climate Action', color: '#3f7e44' },
  { name: 'Life Below Water', color: '#0a97d9' },
  { name: 'Life on Land', color: '#56c02b' },
  { name: 'Peace, Justice and Strong Institutions', color: '#00689d' },
  { name: 'Partnerships for the Goals', color: '#19486a' },
];

export class UnSdg extends LitElement {
  static get properties() {
    return {
      goal: { type: String, reflect: true },
      label: { type: String },
      colorOnly: { type: Boolean, attribute: 'color-only', reflect: true },
      _currentSrc: { type: String },
      alt: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: 254px;
        height: 254px;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      .color-only {
        width: 100%;
        height: 100%;
      }
    `;
  }

  constructor() {
    super();
    this.goal = '1';
    this.label = '';
    this.alt = null;
    this.colorOnly = false;
    this._currentSrc = null;
  }

  updated(changedProperties) {
    if (changedProperties.has('goal')) {
      this.updateGoalImage();
    }
  }

  updateGoalImage() {
    if (this.goal === 'all' || this.goal === 'circle') {
      this._currentSrc = new URL(
        `./lib/svgs/goal-${this.goal}.svg`,
        import.meta.url
      ).href;
      this.alt =
        this.goal === 'all'
          ? 'All Sustainable Development Goals'
          : 'Sustainable Development Goals Circle';
    } else {
      const goalNumber = parseInt(this.goal);
      if (goalNumber >= 1 && goalNumber <= 17) {
        this._currentSrc = new URL(
          `./lib/svgs/goal-${goalNumber}.svg`,
          import.meta.url
        ).href;
        this.alt = `Goal ${goalNumber}: ${goalData[goalNumber - 1].name}`;
      }
    }
  }

  render() {
    if (this.colorOnly) {
      const goalNumber = parseInt(this.goal);
      if (goalNumber >= 1 && goalNumber <= 17) {
        const color = goalData[goalNumber - 1].color;
        return html`<div class="color-only" style="background-color: ${color};"></div>`;
      }
    }

    return html`
    <img
      src="${this._currentSrc}"
      alt="${this.label || this.alt}"
      loading="lazy"
      fetchpriority="low"
    />`;
  }
}

customElements.define('un-sdg', UnSdg);
