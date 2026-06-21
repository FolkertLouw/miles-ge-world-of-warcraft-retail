# Plan Stub — What should I do with 100 Light Leather?

Status: draft / missing live data.

## Question

> I have 100 Light Leather. What should I do with it?

## Current answer quality

Not ready for real recommendation yet. The entity structure exists, but the system still needs:

- verified vendor value;
- current AH value;
- recipe/crafting relations;
- sale velocity;
- profession-leveling value;
- conversion/crafting alternatives.

## Recommendation framework

When data is available, MILES should answer in this format:

```text
Quickest value:
- Sell raw Light Leather on the Auction House if AH price is above vendor floor and sale velocity is acceptable.

Highest potential value:
- Craft/convert only if output value minus input cost and expected sale delay beats raw sale.

Safest value:
- Keep or sell raw unless a verified profitable recipe exists.

Keep amount:
- Reserve a configurable amount if leveling Leatherworking soon.

Avoid:
- Do not vendor unless AH value is below threshold or bag pressure is high.
```

## Next data tasks

- Add verified item data.
- Add recipe relations.
- Add AH snapshot.
- Add sale velocity classification.
