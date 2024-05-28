const { widget } = figma;
const { AutoLayout, Input, useSyncedState, usePropertyMenu } = widget;

function ColorSwatchWidget() {
  const [colorName, setColorName] = useSyncedState("colorName", "");
  const [colorCode, setColorCode] = useSyncedState("colorCode", "");

  // Validate HEX color code input
  function isValidHex(hex: string) {
    return /^#[0-9A-F]{6}$/i.test(hex);
  }

  // Define the property menu items
  const menuItems: WidgetPropertyMenuItem[] = [
    { itemType: 'action', tooltip: 'Reset Color', propertyName: 'reset-color' },
  ];

  // Handle property menu item selection
  usePropertyMenu(menuItems, ({ propertyName }) => {
    if (propertyName === 'reset-color') {
      setColorName('');
      setColorCode('');
    }
  });

  // Handle color code input
  function handleColorCodeChange(value: string) {
    let colorValue = value.trim(); // Remove leading and trailing spaces
    colorValue = colorValue.toLowerCase(); // Convert to lowercase

    
    // Check if the color value starts with #
    if (!colorValue.startsWith("#")) {
        // Prepend # to the color value
        colorValue = "#" + colorValue;
    }

    if (isValidHex(colorValue)) {
      setColorCode(colorValue);
    } else {
      figma.notify("Invalid color code. Please enter a valid HEX color code.");
    }
  }

  return (
    <AutoLayout
      name="component-canvas"
      direction="vertical"
      padding={{ vertical: 40, horizontal: 24 }}
      width="hug-contents"
      horizontalAlignItems="center"
      fill={colorCode || '#000000'}
    >
      <AutoLayout
        name="card"
        direction="vertical"
        width="hug-contents"
        height="hug-contents"
        fill="#ffffff"
        padding={20}
        spacing={20}
        cornerRadius={4}
      >
        <AutoLayout
          name="swatch"
          width={250}
          height={250}
          fill={colorCode || '#000000'}
          stroke={colorCode === "#ffffff" ? "#cccccc" : colorCode}          
          cornerRadius={8}
        />
        <Input
          inputFrameProps={{
            fill: "#ffffff",
            stroke: colorCode === "" ? "#cccccc" : "#ffffff",
            cornerRadius: 4,
            padding: { top: 0, bottom: 0, left: 8, right: 8 },
          }}
          name="color-name"
          value={colorName}
          placeholder="Color Name"
          onTextEditEnd={(e) => setColorName(e.characters)}
          width="fill-parent"
          fontFamily="Inter"
          fontSize={32}
          fontWeight={700}
          letterSpacing={-1.5}
          lineHeight={44}
        />
        <Input
          inputFrameProps={{
            fill: "#ffffff",
            stroke: colorCode === "" ? "#cccccc" : "#ffffff",
            cornerRadius: 4,
            padding: { top: 0, bottom: 0, left: 8, right: 8 },
          }}
          name="color-code"
          value={colorCode}
          placeholder="Color Code"
          tooltip="Enter a valid HEX color code"
          onTextEditEnd={(e) => handleColorCodeChange(e.characters)}
          width="fill-parent"
          fontFamily="Inter"
          fontSize={16}
          fontWeight={700}
          fill="#000000"
          lineHeight={44}
        />
      </AutoLayout>
    </AutoLayout>
  );
}

widget.register(ColorSwatchWidget);
