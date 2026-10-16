import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  useMemo,
} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

// ─── typy ─────────────────────────────────────────────────────────────────────

interface GlossaryTermProps {
  term: string;
  definition?: string;
  shortDefinition?: string;
  references?: string; // JSON: Reference[] — przekazywane przez remark, niewyświetlane w dymku (WCAG: tooltip pasywny)
  acronym?: string;    // przekazywane przez remark, niewyświetlane w dymku
  definitionType?: string; // przekazywane przez remark, niewyświetlane w dymku
  id?: string;
  routePath?: string;
  documentationPath?: string;
  children?: React.ReactNode;
}

// ─── stałe ────────────────────────────────────────────────────────────────────

const DISMISS_KEY = 'Escape';
const EVENT_FOCUSOUT = 'focusout';
const EVENT_KEYDOWN = 'keydown';
const EVENT_POINTERDOWN = 'pointerdown';
const EVENT_RESIZE = 'resize';
const EVENT_SCROLL = 'scroll';
const INFO_BUTTON_LABEL_PREFIX = 'Pokaż definicję ';
const INFO_ICON = 'ⓘ';
const NAVBAR_SELECTOR = '.navbar';
const PLACEMENT_BOTTOM = 'bottom';
const PLACEMENT_TOP = 'top';
const TOOLTIP_EDGE_MARGIN = 8;
const TOOLTIP_GAP = 8;
const TOOLTIP_TOP_OFFSET = 4;

type TTooltipPlacement = typeof PLACEMENT_TOP | typeof PLACEMENT_BOTTOM;

// ─── główny komponent ──────────────────────────────────────────────────────────
// Wzorzec „tooltip-popover": definicja pokazywana TYLKO po
// jawnym kliknięciu przycisku, nie na hover/focus. Dzięki temu:
//  - WCAG 1.4.13 (Content on Hover or Focus) nie ma zastosowania — brak treści
//    wywoływanej hoverem/focusem,
//  - tap na link jest przewidywalny (nawigacja do hasła w słowniku), a dymek ma
//    własny, czytelnie opisany przycisk (WCAG 2.5.3 Label in Name, 3.2.1 On Focus).

export default function GlossaryTerm({
  term,
  definition,
  shortDefinition,
  references: _references,   // przekazywane przez remark, nieużywane w dymku
  acronym: _acronym,         // przekazywane przez remark, nieużywane w dymku
  definitionType: _definitionType, // przekazywane przez remark, nieużywane w dymku
  id,
  routePath = '/slownik',
  documentationPath,
  children,
}: GlossaryTermProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipGeometry, setTooltipGeometry] =
    useState<{ left: number; top: number } | null>(null);
  const [placement, setPlacement] = useState<TTooltipPlacement>(PLACEMENT_TOP);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const tooltipId = useId();

  // ── pozycjonowanie dymku ───────────────────────────────────────────────────
  const updatePosition = useCallback(() => {
    const anchor = anchorRef.current;
    const tooltip = tooltipRef.current;

    if (anchor === null || tooltip === null) {
      return;
    }

    const anchorRect = anchor.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = globalThis.innerWidth;
    const viewportHeight = globalThis.innerHeight;
    const stickyHeader = document.querySelector(NAVBAR_SELECTOR);
    const headerBottom = stickyHeader === null ? 0 : stickyHeader.getBoundingClientRect().bottom;
    const topBoundary = Math.max(0, headerBottom);
    const hasSpaceAbove = anchorRect.top - topBoundary >= tooltipRect.height + TOOLTIP_GAP;
    const hasSpaceBelow = viewportHeight - anchorRect.bottom >= tooltipRect.height + TOOLTIP_GAP;
    const showAbove = hasSpaceAbove || hasSpaceBelow === false;
    const nextPlacement = showAbove ? PLACEMENT_TOP : PLACEMENT_BOTTOM;
    const rawTop = nextPlacement === PLACEMENT_TOP
      ? anchorRect.top - tooltipRect.height - TOOLTIP_GAP
      : anchorRect.bottom + TOOLTIP_GAP;
    const rawLeft = anchorRect.left + anchorRect.width / 2 - tooltipRect.width / 2;
    const left = Math.max(
      TOOLTIP_EDGE_MARGIN,
      Math.min(rawLeft, viewportWidth - tooltipRect.width - TOOLTIP_EDGE_MARGIN)
    );

    setPlacement(nextPlacement);
    setTooltipGeometry({ left, top: Math.max(topBoundary + TOOLTIP_TOP_OFFSET, rawTop) });
  }, []);

  // Dymek jest pozycjonowany absolutnie (fixed), więc musi nadążać za scrollem.
  useEffect(() => {
    if (showTooltip === false) {
      return undefined;
    }

    let secondFrameId = 0;

    // Dwie klatki: pierwsza montuje dymek, druga mierzy go po layoutcie.
    const schedulePositionUpdate = () => {
      secondFrameId = globalThis.requestAnimationFrame(updatePosition);
    };

    const firstFrameId = globalThis.requestAnimationFrame(schedulePositionUpdate);

    const onScroll = () => updatePosition();
    const onResize = () => updatePosition();

    globalThis.addEventListener(EVENT_SCROLL, onScroll, true);
    globalThis.addEventListener(EVENT_RESIZE, onResize);

    return () => {
      globalThis.cancelAnimationFrame(firstFrameId);

      if (secondFrameId !== 0) {
        globalThis.cancelAnimationFrame(secondFrameId);
      }

      globalThis.removeEventListener(EVENT_SCROLL, onScroll, true);
      globalThis.removeEventListener(EVENT_RESIZE, onResize);
    };
  }, [showTooltip, updatePosition]);

  // ── dismiss: Escape, kliknięcie/tap poza wrapperem, zejście focusem ───────
  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (showTooltip === false || wrapper === null) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === DISMISS_KEY) {
        setShowTooltip(false);
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      // `event.target` to EventTarget — DOM lib wymaga zawężenia do Node dla contains()
      if (wrapper.contains(event.target as Node) === false) {
        setShowTooltip(false);
      }
    };

    const onFocusOut = (event: FocusEvent) => {
      // `relatedTarget` bywa null (focus wychodzi poza dokument)
      if (wrapper.contains(event.relatedTarget as Node | null) === false) {
        setShowTooltip(false);
      }
    };

    document.addEventListener(EVENT_KEYDOWN, onKeyDown);
    document.addEventListener(EVENT_POINTERDOWN, onPointerDown);
    wrapper.addEventListener(EVENT_FOCUSOUT, onFocusOut);

    return () => {
      document.removeEventListener(EVENT_KEYDOWN, onKeyDown);
      document.removeEventListener(EVENT_POINTERDOWN, onPointerDown);
      wrapper.removeEventListener(EVENT_FOCUSOUT, onFocusOut);
    };
  }, [showTooltip]);

  // ── definicja do dymku (shortDefinition priorytetowo) ─────────────────────
  const tooltipDefinition = useMemo(() => {
    const shortText = shortDefinition === undefined ? '' : shortDefinition.trim();

    if (shortText !== '') {
      return shortText;
    }

    const fullText = definition === undefined ? '' : definition.trim();

    if (fullText !== '') {
      return fullText;
    }

    return undefined;
  }, [shortDefinition, definition]);

  // ── id hasła do anchor linka ───────────────────────────────────────────────
  const termId = useMemo(() => {
    const explicitId = id === undefined ? '' : id.trim();

    if (explicitId !== '') {
      return explicitId;
    }

    return term.toLowerCase().replace(/\s+/g, '-');
  }, [id, term]);

  // ── render ─────────────────────────────────────────────────────────────────
  const displayText = children ?? term;
  const labelText = typeof displayText === 'string' ? displayText : term;

  const toggleTooltip = () => setShowTooltip((visible) => !visible);

  const tooltipStyle = showTooltip && tooltipGeometry !== null
    ? { left: `${tooltipGeometry.left}px`, top: `${tooltipGeometry.top}px` }
    : undefined;

  return (
    <span ref={wrapperRef} className={styles.glossaryTermWrapper}>
      <Link className={styles.glossaryTerm} to={documentationPath ?? `${routePath}#${termId}`}>
        {displayText}
      </Link>

      {tooltipDefinition !== undefined && (
        <>
          <button
            aria-controls={tooltipId}
            aria-describedby={showTooltip ? tooltipId : undefined}
            aria-expanded={showTooltip}
            aria-label={`${INFO_BUTTON_LABEL_PREFIX}${labelText}`}
            className={styles.infoButton}
            onClick={toggleTooltip}
            ref={anchorRef}
            type="button"
          >
            <span aria-hidden="true" className={styles.infoIcon}>{INFO_ICON}</span>
          </button>

          <span
            className={[
              styles.tooltip,
              showTooltip ? styles.tooltipVisible : '',
              placement === PLACEMENT_TOP ? styles.tooltipTop : styles.tooltipBottom,
              styles.tooltipFloating
            ].filter((classNamePart) => classNamePart !== '').join(' ')}
            id={tooltipId}
            ref={tooltipRef}
            role="tooltip"
            style={tooltipStyle}
          >
            {tooltipDefinition}
          </span>
        </>
      )}
    </span>
  );
}
