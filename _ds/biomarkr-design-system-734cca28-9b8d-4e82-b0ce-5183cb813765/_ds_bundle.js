/* @ds-bundle: {"format":3,"namespace":"BiomarkrDesignSystem_734cca","components":[{"name":"Button","sourcePath":"components/buttons/Button.jsx"},{"name":"IconButton","sourcePath":"components/buttons/IconButton.jsx"},{"name":"Avatar","sourcePath":"components/data/Avatar.jsx"},{"name":"BiomarkerReadout","sourcePath":"components/data/BiomarkerReadout.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Tag","sourcePath":"components/feedback/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Card","sourcePath":"components/layout/Card.jsx"},{"name":"SectionHeader","sourcePath":"components/layout/SectionHeader.jsx"}],"sourceHashes":{"components/buttons/Button.jsx":"56e4fe18c117","components/buttons/IconButton.jsx":"aa3c2493168b","components/data/Avatar.jsx":"0f09925db587","components/data/BiomarkerReadout.jsx":"3fccd779e206","components/feedback/Badge.jsx":"9f7f77a1d36a","components/feedback/Tag.jsx":"349264dd47cc","components/forms/Checkbox.jsx":"6944c001cdc5","components/forms/Input.jsx":"85e53763e221","components/forms/Select.jsx":"e3958f592ca8","components/forms/Switch.jsx":"ee2d86a73b65","components/layout/Card.jsx":"721e1c42162f","components/layout/SectionHeader.jsx":"7c107ce1084a","ui_kits/website/WebsiteParts.jsx":"c1806e30679d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BiomarkrDesignSystem_734cca = window.BiomarkrDesignSystem_734cca || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/buttons/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Biomarkr Button — the primary action primitive.
 * Monochrome by design: a solid black "primary", a hairline-bordered
 * "secondary", and a chromeless "ghost". The pill radius echoes the
 * brand's floating navigation.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  shape = 'pill',
  fullWidth = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '0 16px',
      height: 34,
      fontSize: 13
    },
    md: {
      padding: '0 24px',
      height: 42,
      fontSize: 14
    },
    lg: {
      padding: '0 36px',
      height: 52,
      fontSize: 15
    }
  };
  const s = sizes[size] || sizes.md;
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: s.height,
    padding: s.padding,
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'var(--font-sans)',
    fontSize: s.fontSize,
    fontWeight: 500,
    letterSpacing: '0.01em',
    lineHeight: 1,
    borderRadius: shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-sm)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    transition: 'background-color var(--dur-fast) var(--ease-standard), color var(--dur-fast) var(--ease-standard), border-color var(--dur-fast) var(--ease-standard), opacity var(--dur-fast)',
    whiteSpace: 'nowrap',
    border: '1px solid transparent',
    userSelect: 'none'
  };
  const variants = {
    primary: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)',
      borderColor: 'var(--surface-inverse)'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      borderColor: 'transparent'
    }
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyle = !disabled && hover ? {
    primary: {
      opacity: 0.82
    },
    secondary: {
      background: 'var(--surface-raised)'
    },
    ghost: {
      background: 'var(--surface-raised)',
      color: 'var(--text-primary)'
    }
  }[variant] : {};
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...variants[variant],
      ...hoverStyle,
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/Button.jsx", error: String((e && e.message) || e) }); }

// components/buttons/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — a square or circular control wrapping a single icon.
 * Used for the theme toggle, close affordances, toolbar actions.
 * Pass a Lucide (or any 24px stroke) icon as children.
 */
function IconButton({
  children,
  variant = 'ghost',
  size = 'md',
  shape = 'circle',
  disabled = false,
  ariaLabel,
  onClick,
  style = {},
  ...rest
}) {
  const dims = {
    sm: 32,
    md: 40,
    lg: 48
  }[size] || 40;
  const [hover, setHover] = React.useState(false);
  const variants = {
    ghost: {
      background: hover ? 'var(--surface-raised)' : 'transparent',
      color: 'var(--text-primary)',
      borderColor: 'transparent'
    },
    outline: {
      background: hover ? 'var(--surface-raised)' : 'transparent',
      color: 'var(--text-primary)',
      borderColor: 'var(--border-default)'
    },
    solid: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)',
      borderColor: 'var(--surface-inverse)',
      opacity: hover ? 0.82 : 1
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dims,
      height: dims,
      borderRadius: shape === 'circle' ? 'var(--radius-circle)' : 'var(--radius-md)',
      border: '1px solid transparent',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.4 : 1,
      transition: 'background-color var(--dur-fast) var(--ease-standard), opacity var(--dur-fast)',
      padding: 0,
      ...variants[variant],
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/buttons/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/data/Avatar.jsx
try { (() => {
/**
 * Avatar — circular photo, or initials fallback on a tinted surface.
 */
function Avatar({
  src,
  name = '',
  size = 'md',
  style = {}
}) {
  const dims = {
    xs: 28,
    sm: 36,
    md: 48,
    lg: 64
  }[size] || 48;
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dims,
      height: dims,
      borderRadius: 'var(--radius-circle)',
      overflow: 'hidden',
      background: 'var(--surface-raised)',
      border: '1px solid var(--border-subtle)',
      flexShrink: 0,
      ...style
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: dims * 0.36,
      fontWeight: 500,
      color: 'var(--text-secondary)',
      letterSpacing: '0.02em'
    }
  }, initials || '—'));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data/BiomarkerReadout.jsx
try { (() => {
/**
 * BiomarkerReadout — the signature Biomarkr data primitive. Shows a
 * marker, its current value + unit, status relative to the personal
 * baseline, and an optional longitudinal sparkline. Monochrome line,
 * status conveyed by a single muted dot + label.
 */
function BiomarkerReadout({
  marker,
  name,
  value,
  unit = 'pg/mL',
  status = 'baseline',
  // baseline | elevated | low | watch
  series = [],
  // array of numbers for the sparkline
  baselineLabel = 'vs. baseline',
  style = {}
}) {
  const statusMap = {
    baseline: {
      color: 'var(--signal-info)',
      label: 'At baseline'
    },
    elevated: {
      color: 'var(--signal-critical)',
      label: 'Elevated'
    },
    low: {
      color: 'var(--signal-positive)',
      label: 'In range'
    },
    watch: {
      color: 'var(--signal-caution)',
      label: 'Watch'
    }
  };
  const st = statusMap[status] || statusMap.baseline;
  const W = 96,
    H = 32;
  let path = null;
  if (series.length > 1) {
    const min = Math.min(...series),
      max = Math.max(...series);
    const span = max - min || 1;
    const step = W / (series.length - 1);
    path = series.map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i * step).toFixed(1)} ${(H - (v - min) / span * (H - 6) - 3).toFixed(1)}`).join(' ');
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 20,
      padding: '18px 20px',
      background: 'var(--surface-page)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      letterSpacing: '0.04em',
      color: 'var(--text-primary)'
    }
  }, marker), name && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-tertiary)'
    }
  }, name)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 5,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 30,
      fontWeight: 300,
      letterSpacing: '-0.02em',
      color: 'var(--text-primary)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-tertiary)'
    }
  }, unit)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: st.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--text-secondary)'
    }
  }, st.label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: 'var(--text-tertiary)'
    }
  }, "\xB7 ", baselineLabel))), path && /*#__PURE__*/React.createElement("svg", {
    width: W,
    height: H,
    viewBox: `0 0 ${W} ${H}`,
    style: {
      flexShrink: 0,
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: path,
    fill: "none",
    stroke: "var(--text-primary)",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: W,
    cy: H - (series[series.length - 1] - Math.min(...series)) / (Math.max(...series) - Math.min(...series) || 1) * (H - 6) - 3,
    r: "2.5",
    fill: st.color
  })));
}
Object.assign(__ds_scope, { BiomarkerReadout });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/BiomarkerReadout.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
/**
 * Badge — a small status label. Default tones are monochrome
 * (neutral / solid / outline). Functional tones map to the muted
 * signal palette and should only carry status meaning.
 */
function Badge({
  children,
  tone = 'neutral',
  size = 'md',
  dot = false,
  style = {}
}) {
  const pad = size === 'sm' ? '2px 8px' : '3px 10px';
  const fs = size === 'sm' ? 11 : 12;
  const tones = {
    neutral: {
      background: 'var(--surface-raised)',
      color: 'var(--text-secondary)',
      border: '1px solid var(--border-subtle)'
    },
    solid: {
      background: 'var(--surface-inverse)',
      color: 'var(--text-inverse)',
      border: '1px solid var(--surface-inverse)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-strong)'
    },
    positive: {
      background: 'rgba(47,125,82,0.10)',
      color: 'var(--signal-positive)',
      border: '1px solid rgba(47,125,82,0.25)'
    },
    caution: {
      background: 'rgba(154,106,0,0.10)',
      color: 'var(--signal-caution)',
      border: '1px solid rgba(154,106,0,0.25)'
    },
    critical: {
      background: 'rgba(162,59,50,0.10)',
      color: 'var(--signal-critical)',
      border: '1px solid rgba(162,59,50,0.25)'
    },
    info: {
      background: 'rgba(54,80,107,0.10)',
      color: 'var(--signal-info)',
      border: '1px solid rgba(54,80,107,0.25)'
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: pad,
      fontFamily: 'var(--font-sans)',
      fontSize: fs,
      fontWeight: 500,
      letterSpacing: '0.01em',
      lineHeight: 1.4,
      borderRadius: 'var(--radius-pill)',
      whiteSpace: 'nowrap',
      ...tones[tone],
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'currentColor'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tag.jsx
try { (() => {
/**
 * Tag — a selectable / removable chip used for filters and panel
 * builders. Selected state inverts to near-black. Optional onRemove
 * renders a trailing ✕.
 */
function Tag({
  children,
  selected = false,
  onClick,
  onRemove,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const interactive = !!onClick;
  return /*#__PURE__*/React.createElement("span", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '5px 12px',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 500,
      borderRadius: 'var(--radius-pill)',
      cursor: interactive ? 'pointer' : 'default',
      userSelect: 'none',
      transition: 'all var(--dur-fast) var(--ease-standard)',
      background: selected ? 'var(--surface-inverse)' : hover && interactive ? 'var(--surface-raised)' : 'transparent',
      color: selected ? 'var(--text-inverse)' : 'var(--text-primary)',
      border: `1px solid ${selected ? 'var(--surface-inverse)' : 'var(--border-default)'}`,
      ...style
    }
  }, children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: e => {
      e.stopPropagation();
      onRemove();
    },
    "aria-label": "Remove",
    style: {
      display: 'inline-flex',
      border: 'none',
      background: 'transparent',
      padding: 0,
      cursor: 'pointer',
      color: 'inherit',
      opacity: 0.65
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
/**
 * Checkbox — square, hairline, fills near-black with a paper check when on.
 */
function Checkbox({
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  label,
  id,
  style = {}
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const boxId = id || React.useId();
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: boxId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-primary)',
      opacity: disabled ? 0.5 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "checkbox",
    "aria-checked": on,
    id: boxId,
    disabled: disabled,
    onClick: toggle,
    style: {
      width: 20,
      height: 20,
      flexShrink: 0,
      padding: 0,
      borderRadius: 'var(--radius-xs)',
      background: on ? 'var(--surface-inverse)' : 'transparent',
      border: `1px solid ${on ? 'var(--surface-inverse)' : 'var(--border-strong)'}`,
      cursor: 'inherit',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background-color var(--dur-fast) var(--ease-standard)'
    }
  }, on && /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--text-inverse)",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Input — single-line text field. Hairline border, generous height,
 * a quiet focus state that darkens the border (no colored ring).
 * Supports an optional leading icon and label/hint composition.
 */
function Input({
  label,
  hint,
  error,
  type = 'text',
  placeholder,
  value,
  defaultValue,
  iconLeft = null,
  disabled = false,
  size = 'md',
  id,
  onChange,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const heights = {
    sm: 38,
    md: 46,
    lg: 54
  }[size] || 46;
  const inputId = id || React.useId();
  const borderColor = error ? 'var(--signal-critical)' : focus ? 'var(--border-strong)' : 'var(--border-default)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: heights,
      padding: '0 16px',
      background: 'var(--surface-page)',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      opacity: disabled ? 0.5 : 1,
      transition: 'border-color var(--dur-fast) var(--ease-standard)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--text-tertiary)'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    placeholder: placeholder,
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-primary)',
      minWidth: 0
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: error ? 'var(--signal-critical)' : 'var(--text-tertiary)'
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
/**
 * Select — native dropdown styled to match Input. Hairline border,
 * custom chevron, darken-on-focus. Pass options as [{value,label}] or strings.
 */
function Select({
  label,
  hint,
  options = [],
  value,
  defaultValue,
  disabled = false,
  size = 'md',
  id,
  onChange,
  placeholder,
  style = {}
}) {
  const [focus, setFocus] = React.useState(false);
  const heights = {
    sm: 38,
    md: 46,
    lg: 54
  }[size] || 46;
  const selId = id || React.useId();
  const norm = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 7,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: heights,
      border: `1px solid ${focus ? 'var(--border-strong)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-page)',
      opacity: disabled ? 0.5 : 1,
      transition: 'border-color var(--dur-fast) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("select", {
    id: selId,
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: '100%',
      height: '100%',
      padding: '0 40px 0 16px',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-primary)',
      appearance: 'none',
      WebkitAppearance: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }, placeholder && /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder), norm.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "var(--text-tertiary)",
    strokeWidth: "2",
    style: {
      position: 'absolute',
      right: 14,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  }))), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-tertiary)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/**
 * Switch — a binary toggle. Monochrome: the track fills near-black
 * when on, hairline-outlined when off. The knob is paper-white.
 */
function Switch({
  checked,
  defaultChecked = false,
  disabled = false,
  onChange,
  label,
  id,
  style = {}
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const switchId = id || React.useId();
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on);
  };
  const control = /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "switch",
    "aria-checked": on,
    id: switchId,
    disabled: disabled,
    onClick: toggle,
    style: {
      position: 'relative',
      width: 46,
      height: 26,
      flexShrink: 0,
      borderRadius: 'var(--radius-pill)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: on ? 'var(--surface-inverse)' : 'transparent',
      border: `1px solid ${on ? 'var(--surface-inverse)' : 'var(--border-strong)'}`,
      opacity: disabled ? 0.4 : 1,
      padding: 0,
      transition: 'background-color var(--dur-base) var(--ease-standard), border-color var(--dur-base)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 2,
      left: on ? 22 : 2,
      width: 20,
      height: 20,
      borderRadius: 'var(--radius-circle)',
      background: on ? 'var(--text-inverse)' : 'var(--text-primary)',
      transition: 'left var(--dur-base) var(--ease-out), background-color var(--dur-base)'
    }
  }));
  if (!label) return /*#__PURE__*/React.createElement("span", {
    style: style
  }, control);
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: switchId,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      color: 'var(--text-primary)',
      ...style
    }
  }, control, /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/layout/Card.jsx
try { (() => {
/**
 * Card — the foundational container. Hairline border over the page
 * surface, modest large radius, optional raised tint. Shadows are
 * opt-in (elevation="float") and rarely needed.
 */
function Card({
  children,
  elevation = 'flat',
  tone = 'page',
  padding = 'md',
  interactive = false,
  onClick,
  style = {}
}) {
  const [hover, setHover] = React.useState(false);
  const pads = {
    none: 0,
    sm: 'var(--space-4)',
    md: 'var(--space-5)',
    lg: 'var(--space-6)'
  }[padding] ?? 'var(--space-5)';
  const shadows = {
    flat: 'none',
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    float: 'var(--shadow-float)'
  }[elevation] || 'none';
  const bg = tone === 'tint' ? 'var(--surface-tint)' : tone === 'raised' ? 'var(--surface-raised)' : 'var(--surface-page)';
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: bg,
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-lg)',
      padding: pads,
      boxShadow: interactive && hover ? 'var(--shadow-md)' : shadows,
      borderColor: interactive && hover ? 'var(--border-strong)' : 'var(--border-default)',
      cursor: interactive ? 'pointer' : 'default',
      transition: 'box-shadow var(--dur-base) var(--ease-standard), border-color var(--dur-base) var(--ease-standard)',
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-primary)',
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Card.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionHeader.jsx
try { (() => {
/**
 * SectionHeader — the brand's signature header lockup: a short 60px
 * accent rule, an uppercase tracked eyebrow, and a large light title.
 * Used to open every content section.
 */
function SectionHeader({
  eyebrow,
  title,
  align = 'left',
  rule = true,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: align === 'center' ? 'center' : 'flex-start',
      textAlign: align,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rule && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: 60,
      height: 2,
      background: 'var(--text-primary)',
      marginBottom: 'var(--space-5)'
    }
  }), eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)',
      marginBottom: 'var(--space-2)'
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 28,
      fontWeight: 300,
      letterSpacing: '-0.02em',
      lineHeight: 1.3,
      color: 'var(--text-primary)'
    }
  }, title));
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/WebsiteParts.jsx
try { (() => {
/* Biomarkr Website UI Kit — faithful recreation of the live marketing site.
   Sections are composed from the design-system primitives where natural
   (SectionHeader, Button, Avatar) and bespoke layout otherwise.
   Exports parts to window for index.html to mount. */

const {
  Button,
  SectionHeader,
  Avatar,
  IconButton,
  BiomarkerReadout
} = window.BiomarkrDesignSystem_734cca;

/* ---------- Icons (thin stroke, matching the brand) ---------- */
const SunIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "5"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "1",
  x2: "12",
  y2: "3"
}), /*#__PURE__*/React.createElement("line", {
  x1: "12",
  y1: "21",
  x2: "12",
  y2: "23"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4.22",
  y1: "4.22",
  x2: "5.64",
  y2: "5.64"
}), /*#__PURE__*/React.createElement("line", {
  x1: "18.36",
  y1: "18.36",
  x2: "19.78",
  y2: "19.78"
}), /*#__PURE__*/React.createElement("line", {
  x1: "1",
  y1: "12",
  x2: "3",
  y2: "12"
}), /*#__PURE__*/React.createElement("line", {
  x1: "21",
  y1: "12",
  x2: "23",
  y2: "12"
}), /*#__PURE__*/React.createElement("line", {
  x1: "4.22",
  y1: "19.78",
  x2: "5.64",
  y2: "18.36"
}), /*#__PURE__*/React.createElement("line", {
  x1: "18.36",
  y1: "5.64",
  x2: "19.78",
  y2: "4.22"
}));
const MoonIcon = () => /*#__PURE__*/React.createElement("svg", {
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2"
}, /*#__PURE__*/React.createElement("path", {
  d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
}));
const LinkedIn = () => /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "currentColor"
}, /*#__PURE__*/React.createElement("path", {
  d: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
}));

/* ---------- Header ---------- */
function SiteHeader({
  theme,
  onToggle
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '28px 8%',
      background: 'linear-gradient(to bottom, rgba(var(--mist-rgb),1) 0%, rgba(var(--mist-rgb),0.85) 55%, rgba(var(--mist-rgb),0) 100%)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-wordmark-black.png",
    alt: "biomarkr",
    style: {
      height: 30,
      filter: 'invert(var(--logo-invert,0))'
    }
  }), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      gap: 2,
      background: theme === 'dark' ? 'rgba(20,20,20,0.4)' : 'rgba(255,255,255,0.5)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-pill)',
      padding: 6
    }
  }, ['Thesis', 'Hardware', 'Software', 'Team'].map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: '#' + l.toLowerCase(),
    className: "navlink"
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "mailto:info@biomarkr.health",
    style: {
      fontSize: 14,
      color: 'var(--text-secondary)',
      textDecoration: 'none'
    }
  }, "info@biomarkr.health"), /*#__PURE__*/React.createElement(IconButton, {
    variant: "ghost",
    ariaLabel: "Toggle theme",
    onClick: onToggle
  }, theme === 'dark' ? /*#__PURE__*/React.createElement(SunIcon, null) : /*#__PURE__*/React.createElement(MoonIcon, null))));
}

/* ---------- Hero ---------- */
function Hero() {
  const lines = ['Save 30M lives each year', 'Catch disease before symptoms', 'Make blood testing daily'];
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI(p => (p + 1) % lines.length), 3200);
    return () => clearInterval(t);
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: '92vh',
      overflow: 'hidden',
      paddingBottom: '20vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      height: '82vh',
      display: 'flex',
      alignItems: 'flex-end',
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/website-hand.png",
    alt: "",
    style: {
      height: '100%',
      width: 'auto',
      objectFit: 'contain',
      objectPosition: 'bottom center',
      filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.10))'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "bm-mist",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '52vh',
      zIndex: 3,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '8%',
      top: '70vh',
      zIndex: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)',
      marginBottom: 12
    }
  }, "Biomarkr"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 28,
      fontWeight: 300,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
      color: 'var(--text-primary)'
    }
  }, "Immune Monitoring"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)',
      marginTop: 10
    }
  }, "For Biological Intelligence")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: '8%',
      top: '70vh',
      zIndex: 10,
      width: 380
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)',
      marginBottom: 10
    }
  }, "Our Mission Is To:"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: '5rem'
    }
  }, lines.map((l, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      fontSize: 28,
      fontWeight: 300,
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
      color: 'var(--text-primary)',
      opacity: i === idx ? 1 : 0,
      transform: i === idx ? 'translateY(0)' : 'translateY(20px)',
      transition: 'opacity .5s ease, transform .5s ease'
    }
  }, l)))));
}

/* ---------- Content section ---------- */
function ContentSection({
  id,
  eyebrow,
  title,
  children
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      padding: '7rem 8%',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 900,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: eyebrow,
    title: title,
    style: {
      marginBottom: 'var(--space-6)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      lineHeight: 1.8,
      color: 'var(--text-secondary)'
    }
  }, children)));
}

/* ---------- Team ---------- */
function TeamGrid() {
  const team = [{
    src: '../../assets/team-dylan.jpg',
    name: 'Dylan Brownstein',
    title: 'Chief Executive Officer',
    bio: 'Serial entrepreneur. Previously founded a VC-backed, AI-driven SaaS company. Former investor at Karcher Ventures.'
  }, {
    src: '../../assets/team-reuven.jpg',
    name: 'Dr. Reuven Duer, PhD',
    title: 'Chief Science Officer',
    bio: 'Inventor of the Q-SENS platform. PhD in Physics from Technion. 22 patents. Led BARDA-funded prototype development.'
  }, {
    src: '../../assets/team-aren.jpg',
    name: 'Dr. Aren Giske, MD',
    title: 'Chief Operating Officer',
    bio: 'Twice-appointed medical director. Board Member at Kadlec Medical Center. Occupational & Environmental Medicine specialist.'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '3rem 2rem',
      marginTop: '2rem'
    }
  }, team.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.name,
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    src: m.src,
    name: m.name,
    size: "lg"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, m.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--text-secondary)',
      marginBottom: 8
    }
  }, m.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14.5,
      lineHeight: 1.6,
      color: 'var(--text-secondary)'
    }
  }, m.bio), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: 'inline-flex',
      marginTop: 12,
      color: 'var(--text-tertiary)'
    },
    "aria-label": "LinkedIn"
  }, /*#__PURE__*/React.createElement(LinkedIn, null))))));
}

/* ---------- Device showcase ---------- */
function DeviceShowcase() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: '6rem 8%',
      background: 'radial-gradient(ellipse at center, var(--surface-page) 0%, var(--surface-raised) 35%, var(--grey-200) 55%, var(--surface-page) 82%)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      fontSize: 'clamp(5rem,15vw,13rem)',
      fontWeight: 300,
      color: 'var(--text-primary)',
      opacity: 0.18,
      textAlign: 'center',
      lineHeight: 1.6,
      letterSpacing: '-0.02em',
      margin: 0,
      zIndex: 1,
      pointerEvents: 'none'
    }
  }, "From\xA0Reactive", /*#__PURE__*/React.createElement("br", null), "to Proactive"), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/device-reader.png",
    alt: "Q-SENS reader",
    style: {
      position: 'relative',
      zIndex: 2,
      maxWidth: 760,
      width: '100%'
    }
  }));
}

/* ---------- Footer ---------- */
function SiteFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--surface-inverse)',
      padding: '7rem 8% 3rem',
      color: 'var(--grey-250)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '6rem',
      flexWrap: 'wrap',
      marginBottom: '3rem'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 200
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-wordmark-white.png",
    alt: "biomarkr",
    style: {
      height: 28
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '4rem',
      flexWrap: 'wrap'
    }
  }, [{
    h: 'Contact',
    items: ['info@biomarkr.health']
  }, {
    h: 'Company',
    items: ['Our Thesis', 'Hardware', 'Software', 'Team']
  }, {
    h: 'Legal',
    items: ['Privacy Policy', 'Terms of Service', 'Accessibility']
  }].map(col => /*#__PURE__*/React.createElement("div", {
    key: col.h
  }, /*#__PURE__*/React.createElement("h4", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: 'var(--white)',
      margin: '0 0 14px'
    }
  }, col.h), col.items.map(it => /*#__PURE__*/React.createElement("p", {
    key: it,
    style: {
      margin: '0 0 8px',
      fontSize: 13.5,
      color: 'var(--grey-250)'
    }
  }, it)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      paddingTop: '2rem',
      borderTop: '1px solid var(--paper-a10)',
      fontSize: 12,
      color: 'var(--grey-400)'
    }
  }, "\xA9 2026 Biomarkr \xB7 Monitor, Detect, Prevent."));
}

/* ---------- Composed site ---------- */
function BiomarkrSite() {
  const [theme, setTheme] = React.useState('light');
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-page)',
      minHeight: '100vh',
      transition: 'background-color .3s ease'
    }
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    theme: theme,
    onToggle: () => setTheme(t => t === 'light' ? 'dark' : 'light')
  }), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(ContentSection, {
    id: "thesis",
    eyebrow: "Our",
    title: "Thesis"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "The future of healthcare will be proactive, continuous, and personalized. Diseases will be caught before they become harmful."), /*#__PURE__*/React.createElement("p", null, "At Biomarkr, we believe inflammation holds the key. The WHO ranks chronic inflammation as the greatest threat to human health globally \u2014 with ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-primary)',
      fontWeight: 600
    }
  }, "3 out of 5 people"), " dying from inflammation-driven conditions."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-primary)',
      fontWeight: 600
    }
  }, "Biomarkr is what proactive healthcare actually looks like."))), /*#__PURE__*/React.createElement(ContentSection, {
    id: "hardware",
    eyebrow: "Technology",
    title: "Hardware"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, "We miniaturized a laboratory-grade immunoassay onto a silicon photonic chip roughly the size of a fingernail. It's essentially ELISA on a chip, manufactured at semiconductor scale."), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      padding: 0,
      margin: '1.5rem 0'
    }
  }, ['10–40× cost reduction', 'Results in under 10 minutes', 'Usable at-home & point-of-care', 'Lab-grade accuracy', 'Up to 32 biomarkers per test'].map(li => /*#__PURE__*/React.createElement("li", {
    key: li,
    style: {
      paddingLeft: 24,
      position: 'relative',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 0,
      color: 'var(--text-primary)',
      fontWeight: 600
    }
  }, "\u2022"), li)))), /*#__PURE__*/React.createElement(ContentSection, {
    id: "software",
    eyebrow: "Technology",
    title: "Software"
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 0
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-primary)',
      fontWeight: 600
    }
  }, "AI that gets smarter with every test."), " A single cytokine value is meaningless without context. We build personalized immune intelligence from high-frequency longitudinal data."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 16,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(BiomarkerReadout, {
    marker: "IL-6",
    name: "Interleukin-6",
    value: "22",
    status: "elevated",
    series: [8, 9, 7, 10, 12, 18, 22]
  }), /*#__PURE__*/React.createElement(BiomarkerReadout, {
    marker: "TNF-\u03B1",
    name: "Tumor Necrosis Factor",
    value: "9.3",
    status: "watch",
    series: [7, 7, 8, 8, 9, 9, 9.3]
  }))), /*#__PURE__*/React.createElement(ContentSection, {
    id: "team",
    eyebrow: "Our",
    title: "Team"
  }, /*#__PURE__*/React.createElement(TeamGrid, null)), /*#__PURE__*/React.createElement(DeviceShowcase, null), /*#__PURE__*/React.createElement(SiteFooter, null));
}
Object.assign(window, {
  BiomarkrSite,
  SiteHeader,
  Hero,
  ContentSection,
  TeamGrid,
  DeviceShowcase,
  SiteFooter
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/WebsiteParts.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.BiomarkerReadout = __ds_scope.BiomarkerReadout;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

})();
